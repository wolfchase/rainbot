import random

class Eplist():
    def __init__(self):
        self.episodes = {}

    def load_episode_file(self, file):
        with open(file) as f:
            lines = f.readlines()
            for line in lines:
                if line == "" or line[0] == '#':
                    continue
                ep = line.split(':')
                self.episodes[ep[0]] = ep[1]

    def get_random_episode(self):
        print("getting ep")
        ep = random.choice(list(self.episodes.keys()))
        print(ep)
        return [ep, self.episodes[ep]]

    def get_episode(self, key):
        return self.episodes[key]

    def key_to_readable(self, key):
        return "Season " + key[1:2] + ", " + " Episode " + key[3:]
