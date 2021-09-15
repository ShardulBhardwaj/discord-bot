// https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions
import axios from 'axios';

const DAYS_UNTIL_CUTOFF = 1;

export const getCurrentFreeGames = async () => {
    const res = await axios.get('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions');
    const games: any[] = res.data.data.Catalog.searchStore.elements;
    return games.filter(game => game.price.totalPrice.discountPrice === 0 && game.price.totalPrice.originalPrice > 0)
                .filter(game => {
                    const saleStartDate = game.promotions.promotionalOffers[0].promotionalOffers.find(offer => offer.discountSetting.discountPercentage === 0).startDate
                    return Date.parse(saleStartDate) > new Date().setDate(new Date().getDate() - DAYS_UNTIL_CUTOFF);
                });
}