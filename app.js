new Vue({
	el: '#app',
	
	data: {
		currencies: {},
		amount: null,
		from: 'EUR',
		to: 'USD',
		rate: null,
		loading: false
	},
	
	computed: {
		/**
		 * Convert object currencies to an array
		 */
		formattedCurrencies() {
			return Object.values(this.currencies);
		},
		
		/**
		 * Multiply the amount by the rate to get the result of converting currencies.
		 * The number is shorten by 3 numbers after dot.
		 * @return {string}
		 */
		calculateResult() {
			return (Number(this.amount) * this.rate).toFixed(3);
		},
		
		disabled() {
			return this.amount === '0' || !this.amount || this.loading;
		}
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
		
		/**
		 * Call Axios API to get the rate of exchange between the two currencies selected.
		 */
		convertCurrency() {
			const key = `${this.from}_${this.to}`;
			this.loading = true;
			
			axios.get(`https://free.currconv.com/api/v7/convert?q=${key}&apiKey=63ab6589eff9bc56bc24`)
			.then(response => {
				this.loading = false;
				//console.log(response);
				this.rate = response.data.results[key].val;
			})
		}
	},
});
