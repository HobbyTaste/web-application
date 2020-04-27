import pickle
import numpy as np
import pandas as pd
import h5py


from sklearn.preprocessing import MinMaxScaler


class Dataset(object):

    SACLED_FEATURE_RANGE = (0, 1)

    def __init__(self, config):
        self.config = config
        # get dataset
        self.raw_dataset = self.get_dataset()
        # get scaled dataset and sacler
        self.dataset, self.scaler = self.scaling(self.raw_dataset)

    def process2records(self, ds, config):
        '''
        dataset <length, columns>
        :return: <record_nums, record_len>
        '''
        records = []
        one_record_x_len = config.T * (config.n + 1)
        for i in range(one_record_x_len, ds.shape[0] - config.horizon + 1):
            one_record = np.append(
                ds[i - one_record_x_len: i, :], ds[i + config.horizon - 1, :])
            records.append(one_record)

        return np.array(records)

    def get_batch_data(self, records, config):

        i = len(records)
        one_record_len = config.D * config.T * (config.n + 1) + config.D
        while i > 0:
            start_index = i - config.batch_size
            if start_index < 0:
                break

            batch_data = records[start_index: i, :]
            x = np.reshape(
                batch_data[:, : config.T * config.n * config.D], [-1, config.n, config.T, config.D])
            q = np.reshape(
                batch_data[:, config.T * config.n * config.D: -config.D], [-1, config.T, config.D])
            y = np.reshape(batch_data[:, -config.D:], [-1, config.D])
            yield x, q, y

            i = start_index

    def scaling(self, data):
        scaler = MinMaxScaler(self.SACLED_FEATURE_RANGE)
        data = scaler.fit_transform(data.tolist())

        return data, scaler

    def inverse_transform(self, y_scaled):
        y_scaler = self.scaler

        real_y = y_scaler.inverse_transform(y_scaled)

        return real_y

    def get_all_batch_data(self, config, ds_type='T'):
        is_shuffle = False
        if ds_type == 'T':
            ds = self.train_ds
            is_shuffle = True
        elif ds_type == 'V':
            ds = self.valid_ds
        elif ds_type == 'E':
            ds = self.test_ds
        else:
            raise RuntimeError("Unknown dataset type['T','V', 'E']:", ds_type)

        records = self.process2records(ds, config)
        if is_shuffle:
            np.random.shuffle(records)

        all_batch_data = []
        batch_data = self.get_batch_data(records, config)
        for ds in batch_data:
            all_batch_data.append(ds)

        return all_batch_data

    def divide_ds(self, config, ratios=[0.8, 0.9]):
        len = self.dataset.shape[0]
        records_offset = (config.n + 1) * config.T

        ds_list = []
        prev_index = 0

        ratios.append(1.0)
        for ratio in ratios:
            cur_index = int(len * ratio)
            if prev_index != 0:
                prev_index = prev_index - records_offset

            ds_list.append(self.dataset[prev_index: cur_index])

            prev_index = cur_index

        return ds_list


class NasdaqDataset(Dataset):
    name = 'Nasdaq'

    data_filename = './data/nasdaq100_padding.csv'

    def __init__(self, config):
        Dataset.__init__(self, config)
        self.train_ds, self.valid_ds = self.divide_ds(config, [0.8])
        print('{}-Train dataset shape:'.format(self.name), self.train_ds.shape)
        print('{}-Valid dataset shape:'.format(self.name), self.valid_ds.shape)

    def get_dataset(self):
        '''
        Get <length, D>
        :return: <length, D>
        '''
        data = pd.read_csv(self.data_filename)
        return data.values[:1000, :]
