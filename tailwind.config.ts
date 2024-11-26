import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			salmon: {
  				'100': '#46090e',
  				'200': '#8d121d',
  				'300': '#d31b2b',
  				'400': '#e95562',
  				'500': '#f29ca3',
  				'600': '#f5b0b5',
  				'700': '#f7c3c8',
  				'800': '#fad7da',
  				'900': '#fcebed',
  				DEFAULT: '#f29ca3'
  			},
  			beaver: {
  				'100': '#1f1c19',
  				'200': '#3d3731',
  				'300': '#5c534a',
  				'400': '#7a6f62',
  				'500': '#96897b',
  				'600': '#aba297',
  				'700': '#c0b9b1',
  				'800': '#d5d0cb',
  				'900': '#eae8e5',
  				DEFAULT: '#96897b'
  			},
  			ghost_white: {
  				'100': '#650065',
  				'200': '#ca00ca',
  				'300': '#ff30ff',
  				'400': '#ff95ff',
  				'500': '#fffaff',
  				'600': '#fffbff',
  				'700': '#fffcff',
  				'800': '#fffdff',
  				'900': '#fffeff',
  				DEFAULT: '#fffaff'
  			},
  			argentinian_blue: {
  				'100': '#05233f',
  				'200': '#0a467e',
  				'300': '#0f69be',
  				'400': '#248ced',
  				'500': '#63adf2',
  				'600': '#82bef5',
  				'700': '#a2cef7',
  				'800': '#c1defa',
  				'900': '#e0effc',
  				DEFAULT: '#63adf2'
  			},
  			yinmn_blue: {
  				'100': '#091018',
  				'200': '#12202f',
  				'300': '#1b3047',
  				'400': '#253f5e',
  				'500': '#2e5077',
  				'600': '#4171a7',
  				'700': '#6994c5',
  				'800': '#9bb8d8',
  				'900': '#cddbec',
  				DEFAULT: '#2e5077'
  			},
  			rich_black: {
  				'100': '#000408',
  				'200': '#000910',
  				'300': '#010d18',
  				'400': '#011220',
  				'500': '#011627',
  				'600': '#034a83',
  				'700': '#067ddf',
  				'800': '#48aafa',
  				'900': '#a4d5fd',
  				DEFAULT: '#011627'
  			},
  			main: '#525252',
  			brand: '#f29ca3',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config