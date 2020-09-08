import unicodedata
import dash
import dash_core_components as CORE
import dash_html_components as HTML
from dash.dependencies import Input, Output

from firebase_fetch import FireBaseFetch

APP = dash.Dash(__name__)
FIREBASE_FETCH = FireBaseFetch()

colours = {
    'background': '#2E2E2E',
    'text': '#FFFFFF',
}

APP.layout = HTML.Div(
    style = {
        'backgroundColor': colours['background'],
    },
    children = [
        HTML.H1(
            id = 'title',
            children = 'BOT-OLAUS ',
            style = {
                'textAlign': 'center',
                'color': colours['text'],
                'fontSize': '50px',
                'fontWeight': 'bold',
                'letterSpacing': '10px',
            },
        ),
        HTML.H3(
            id = 'heading',
            children = 'YOUR TRUSTWORTHY AMAZON PRICE TRACKER!🤖📊',
            style = {
                'textAlign': 'center',
                'color': colours['text'],
            }
        ),
        CORE.Dropdown(
            id = 'dropdown',
            placeholder = 'Select tracked item',
            value = list(FIREBASE_FETCH.get_tracked_item_keys())[0],
            options = [
                {'label': label, 'value': label} for label in FIREBASE_FETCH.get_tracked_item_keys()
            ],
        ),
        CORE.Graph(
            id = 'price_history_graph',
            figure = {
                'layout': {
                    'plot_bgcolor': colours['background'],
                    'paper_bgcolor': colours['background'],
                    'font': {
                        'color': colours['text'],
                    },
                },
            },
        ),
    ],
)

@APP.callback(Output('price_history_graph', 'figure'), Input('dropdown', 'value'))
def update_graph_data(dropdown_value: str):
    y_values = []
    for value in list(FIREBASE_FETCH.get_item_data(dropdown_value).values()):
        y_values.append(float(unicodedata.normalize('NFKD', value).replace('.', '').replace(',', '.').split()[0]))
    
    print(sorted(y_values))

    return {
        'data': [
            dict(
                x = list(FIREBASE_FETCH.get_item_data(dropdown_value).keys()),
                y = sorted(y_values)
            )
        ]
    }

if __name__ == '__main__':
    APP.run_server(debug = True)