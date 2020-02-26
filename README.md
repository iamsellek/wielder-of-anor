# Wielder of Anor

Offers some protection against human git mistakes. Use Wielder of Anor to
run your commits and it'll check your staged files for "forbidden" words
(as determined by you) and, if any are found, it will alert you to the
locations of said words. It will also block you from committing to branches
you don't want to accidentally commit to.

## Longer Description

I am absent-minded. Very absent-minded. Absent-minded to the point that I'll
throw a "console.log" or "debugger" command into my code only to completely
forget about them and then happily push all my code without
a care in the world. As you can probably imagine, this gets embarassing quickly.
Like, at best.

Yet despite my constant reminders to
my brain that we really do need to stop this, it keeps quite happily forgetting
everything about everything when it's time to commit my code. And since I
(apparently) can't magically fix the way my brain works, I figured I'd make
my computer double-check me since, you know, that is the entire reason we
invented computers to begin with.

Enter Wielder of Anor.

Wielder of Anor is a quick and easy way to ensure that you aren't committing your
code with "forbidden words" you
don't want there. You yourself determine which words are forbidden, so this app
should be helpful to anyone wanting to prevent certain text from making it past
your dev environment. Maybe you're like me and you can never remember to pull
your debugging commands out of your code before committing. Maybe you're a code
master and commit swaths of code at a time, laughing at the mere mortals around
you who commit smaller chunks of work several times a day, and you can't be
bothered to check through your tens of thousands of lines of code to ensure you
didn't leave some TODO comment in there somewhere. Or maybe your code gets
more and more filled with swear words the more frustrating a problem gets and
you just can't let one of those slip through again because seriously it'd
be like the third or fourth time and you like working here and can't imagine
staying here if you slip up another time or two and...

Ahem. Sorry.

So. If you need to prevent anything in your code from making it past your dev
environment and need a reliable way to do this, use Wielder of Anor.

## Installation

Installation is simple! Just run a `npm install -g wielder-of-anor`, then run
`wielder-of-anor` and follow the instructions. You're now good to go!

## Use/What It Does

To use Wielder of Anor, just run it _from within the code directory you want to
run the forbidden words checks against_ (this is important). From your code
directory, just type `wielder-of-anor` followed by your arguments. To see valid
arguments, run `wielder-of-anor -h`.

Once run, Wielder of Anor will check every file that has been `git add`ed for
forbidden words and print out any files that contain one of them.

If it found none (or if you're forcing a commit), it will run a commit followed
by your commit message. Once it prints out "COMMITTED.", execution will end.
Don't forget to run your git push!

## Wielder of Anor? Wut.

You know, the thing Gandalf calls himself to the Balrog as he's all "YOU SHALL
NOT PASS!" over and over? When he's, you know, preventing the Balrog from
getting past him? He...he prevents a _forbidden_ thing from...

A gatekeeper. This app is a gatekeeper. Gandalf was a Gatekeeper that one
time. It's artistic. Or something.

## License

The MIT License (MIT)

Copyright (c) 2020 Chris Sellek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
