class NasdaqConfig:

    def __init__(self):
        self.T = 8
        self.W = 3
        self.n = 7
        self.highway_window = 6

        # input's variable dim
        self.D = 82
        # output's variable dim
        self.K = 82

        self.horizon = 5

        self.en_conv_hidden_size = 32
        self.en_rnn_hidden_sizes = [20, 32]

        self.input_keep_prob = 0.8
        self.output_keep_prob = 1.0
        self.lr = 0.003
        self.batch_size = 100
