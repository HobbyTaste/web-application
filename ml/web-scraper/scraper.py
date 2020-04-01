import copy
import logging
import re
from difflib import SequenceMatcher

import pandas as pd
import scrapy
import scrapy.crawler as crawler
import vk
from goose3 import Goose
from scrapy.linkextractors.lxmlhtml import LxmlLinkExtractor

logging.getLogger('scrapy').propagate = False


class Scraper(object):

    def __init__(self, data: pd.DataFrame, reject: list = [],
                 vk_token: str = '') -> None:
        for i in range(data['Сайт'].size):
            if 'http' not in str(data['Сайт'][i]):
                data['Сайт'][i] = 'http://' + str(data['Сайт'][i])

        self.urls = data['Сайт']
        self.data = data
        self.reject = reject
        self.vk_token = vk_token

        self.results = dict()
        for url in self.urls:
            curr_result = dict({'email': [],
                                'vk.com': [],
                                'instagram.com': [],
                                'facebook.com': [],
                                'ok.ru': [],
                                'phone': [],
                                'image_source': [],
                                'schedule': [],
                                'title': []})
            self.results[url] = curr_result

    def inspect(self) -> None:
        crawle = crawler.CrawlerProcess()

        for url in self.urls:
            crawle.crawl(self.DataSpider, start_urls=[url],
                         path=self.results, reject=self.reject)
        crawle.start()

    def process_vk_page(self, link: str) -> dict:
        output = dict({'address': '',
                       'metro_station': '',
                       'image_source': ''})
        print(link)

        if not self.vk_token:
            return output

        try:
            session = vk.Session(access_token=self.vk_token)
            vk_api = vk.API(session)

            group_name = link.split('/')[-1]
            info = vk_api.groups.getById(v=6.0, group_id=group_name)[0]

            group_id = info['id']

            if ('photo_200' in info.keys()):
                output['image_source'] = info['photo_200']

            address_info = vk_api.groups.getAddresses(
                v=6.0, group_id=group_id)['items']

            if address_info:

                if('address' in address_info[0].keys()):
                    output['address'] = address_info[0]['address']

                if('metro_station_id' in address_info[0].keys()):
                    metro_station_id = address_info[0]['metro_station_id']
                    metro_station = vk_api.database.getMetroStationsById(v=6.0,
                                                                         station_ids=metro_station_id)
                    output['metro_station'] = metro_station[0]['name']

        except vk.exceptions.VkAPIError:
            print('vk api error')

        return output

    def process_output(self) -> pd.DataFrame:
        columns = ['url', 'email', 'phone', 'vk.com', 'instagram.com', 'facebook.com',
                   'image_source', 'schedule', 'title']

        self.output_df = pd.DataFrame(columns=columns)
        results = copy.deepcopy(self.results)

        for i, res in enumerate(results):
            for elem in columns[1:]:
                results[res][elem] = list(set(results[res][elem]))

                if elem == 'email':
                    max_ratio = 0
                    if results[res][elem]:

                        answer = results[res][elem][0]
                        for email in results[res][elem]:
                            if SequenceMatcher(None, email, res).ratio() > max_ratio:
                                max_ratio = SequenceMatcher(
                                    None, email, res).ratio()
                                answer = email

                        results[res][elem] = [answer]

            curr_row = results[res].copy()

            for key in curr_row:
                if len(curr_row[key]) > 0:
                    curr_row[key] = curr_row[key][0]
                else:
                    curr_row[key] = ''

            curr_row['url'] = res
            curr_row['address'] = ''
            curr_row['metro_station'] = ''

            if curr_row['vk.com']:
                vk_parser_result = self.process_vk_page(curr_row['vk.com'])
                curr_row['address'] = vk_parser_result['address']
                curr_row['metro_station'] = vk_parser_result['metro_station']
                curr_row['image_source'] += ' ' + \
                    vk_parser_result['image_source']

            self.output_df = pd.concat([self.output_df,
                                        pd.DataFrame(curr_row, index=[0])])

        return self.output_df

    class DataSpider(scrapy.Spider):

        name = 'data_spider'

        email_pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}"
        phone_pattern = "[+]*\d{1}[(\- ]{0,2}[0-9]{3}[\- )]{0,2}[0-9]{3}[ -]{1,3}[0-9]{2}[ -]{1,3}[0-9]{2}"

        key_links = ['ceny', 'Ceny', 'schedule', 'Schedule', 'tseny',
                     'tseny', 'Calendar', 'raspisanie', 'calendar',
                     'Raspisanie']
        goose = Goose({'browser_user_agent': 'Mozilla',
                       'parser_class': 'soup',
                       'enable_image_fetching': True,
                       'strict': False})

        key_words = ['vk.com', 'instagram.com', 'facebook.com',
                     'ok.ru']

        def get_image(self, response):
            img = self.goose.extract(url=str(response.url)).top_image

            if img:
                self.path[self.start_urls[0]]['image_source'].append(img.src)

        def get_title(self, response):
            title = self.goose.extract(url=str(response.url)).title
            self.path[self.start_urls[0]]['title'].append(title)

        def parse(self, response):
            self.get_image(response)
            self.get_title(response)

            links = LxmlLinkExtractor(allow=()).extract_links(response)
            links = [str(link.url) for link in links]
            links.append(str(response.url))

            corr_links = []

            for link in links:
                for word in self.key_words:
                    if word in link:
                        self.path[self.start_urls[0]][word].append(link)

                if 't.me' not in link:
                    corr_links.append(link)

            corr_links = list(tuple(corr_links))

            for link in corr_links:
                yield scrapy.Request(url=link, callback=self.parse_link)

        def parse_link(self, response):

            for word in self.reject + self.key_words:
                if word in str(response.url):
                    return

            html_text = str(response.text)

            schedule_list = []

            for key_link in self.key_links:
                if key_link in str(response.url):
                    schedule_list.append(str(response.url))

            mail_list = re.findall(self.email_pattern, html_text)
            phone_list = re.findall(self.phone_pattern, html_text)

            self.path[self.start_urls[0]]['email'] += mail_list
            self.path[self.start_urls[0]]['phone'] += phone_list
            self.path[self.start_urls[0]]['schedule'] += schedule_list
