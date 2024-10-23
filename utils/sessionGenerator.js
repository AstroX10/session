function generateSession() {
 const randomNumbers = () => Math.floor(Math.random() * 90) + 10;
 return `XSTRO_${randomNumbers()}_${randomNumbers()}_${randomNumbers()}`;
}
module.exports = generateSession;
