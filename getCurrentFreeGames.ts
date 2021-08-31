// https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions
import axios from 'axios';


export async function getCurrentFreeGames(){
    const res = await axios.get('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions');
    const games: any[] = res.data.data.Catalog.searchStore.elements;
    return games.filter(game => game.price.totalPrice.discountPrice === 0 && game.price.totalPrice.originalPrice > 0 );
}