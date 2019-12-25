#!/bin/bash

# собираем проект
NODE_ENV=production yarn buid

# загружаем статику на s3
aws --endpoint-url=https://storage.yandexcloud.net s3 sync dist/  s3://hobby-taste/static/
