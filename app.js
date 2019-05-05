new Vue({
	el: '#app',
	
	data: {
		currencies: {}
	},
	
	mounted() {
		this.getCurrencies();
		
		},
	
	
	methods: {
		/**
		 * Get currencies from API (https://free.currencyconverterapi.com/)
		 * We store data in localStorage to avoid consuming the API each time
		 * Otherwise, if there is no currencies value in localStorage, we call the API
		 *
		 * @return collection of currencies
		 */
		getCurrencies() {
			const currencies = localStorage.getItem('currencies');
			
			if (currencies) {
				this.currencies = JSON.parse(currencies);
				
				return;
			}
			
			axios.get('https://free.currconv.com/api/v7/currencies?apiKey=63ab6589eff9bc56bc24')
			.then(response =>{
				//console.log('response: ', response);
				this.currencies = response.data.results;
				localStorage.setItem('currencies', JSON.stringify(response.data.results));
			});
		},
		
	},
});
