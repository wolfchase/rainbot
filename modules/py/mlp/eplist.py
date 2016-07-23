import random

class Eplist():
    def __init__(self):
        """ Creates a new Eplist, view method docs for more information """
        self.episodes = {}

    def load_episode_file(self, file):
        """ Loads a file with episodes in it.

        Parameters
        ----------
        file: string
            A file containing episodes in key value pairs such as s1e02:Friendship is Magic Part 2.

        Notes
        -----
        Will ignore any empty lines or lines beginning with a pound symbol. The pound symbol should
        let you be able to add comments.

        """
        with open(file) as f:
            lines = f.readlines()
            for line in lines:
                if line == "" or line[0] == '#':
                    continue
                ep = line.rstrip().split(':')
                self.episodes[ep[0]] = ep[1]

    def get_random_episode(self):
        """ Will return a random episode as a two value list with its key as the leading value. """
        ep = random.choice(list(self.episodes.keys()))
        return [ep, self.episodes[ep]]

    def get_episode(self, key):
        """ Gets an episode (the title) using its key. Returns None if key is invalid. """
        return self.episodes.get(key)

    def key_to_readable(self, key):
        """ Formats an episode key to be readable. """
        return "Season " + key[1:2] + ", " + "Episode " + key[3:]
