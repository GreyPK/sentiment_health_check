I wrote a simple program for myself to notify the health of a sentiment position in a telegram bot. If you have some knowledge in etherscan, nodejs and tg bot you may find it helpful. If you don't have these skills you are unlikely to be able to run this program, i think. I don't ask to put wallet's private keys in the code, so the code can't steal anything from the wallet.
The steps are like this:
1) Install nodejs (You may need to reboot the PC if step 3 didn't work)
2) Download and unpack repo
3) Open repo folder in console and run command: npm i
4) Edit constants in file index.js, lines 4-10 (you will need to create telegram bot, sign up arbiscan account). For get SENTIMENT_ACCOUNT you need to find and open your  first sentiment transaction "openAccount" on arbiscan, click Logs tab and copy first address from the top, that you see
5) Run command in repo folder: node index.js

You can run this script on an external server, so it will work even when the home computer is off. To do this you will need the program "forever"
