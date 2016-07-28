from pyrml import Module
from eplist import Eplist

import pkg_resources

def is_number(s):
    try:
        int(s)
        return True
    except ValueError:
        return False

class mlp(Module):
    def __init__(self):
        Module.__init__(self, "mlp", "Commands for MLP")
        self.eplist = Eplist()
        self.eplist.load_episode_file(pkg_resources.resource_filename(__name__, "/episodes.txt"))

    def _find_ep(self, args):
        if not is_number(args[0]):
            return args[0] + " is not a number"
        
        elif not is_number(args[1]):
            return args[1] + " is not a number"
        
        season = args[0]
        episode = '0' + args[1] if len(args[1]) is 1 else args[1]

        return self.eplist.get_episode('s' + season + 'e' + episode)

    def ep(self, msg, args):
        to = msg["Params"][0]

        if len(args) > 2:
            self.say(to, "Too many arguments")

        elif len(args) is 0:
            ep = self.eplist.get_random_episode()
            self.say(to, "You should watch: " + ep[1] + " (" + self.eplist.key_to_readable(ep[0]) + ")")

        elif len(args) != 2:
            self.say(to, "Insufficient arguments")

        else:
            result = self._find_ep(args)
            if result:
                self.say(to, result)
            else:
                self.say(to, "Found nothing")
        
        return

    def rigged(self, msg, args):
        self.say(msg["Params"][0], "This won't work" + 0)

if __name__ == '__main__':
    m = mlp()
    
    m.add_command("ep", {
        "Help": "I'll think of something good for this'",
        "Fun": m.ep
    })

    m.register()