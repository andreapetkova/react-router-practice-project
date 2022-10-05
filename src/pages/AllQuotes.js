import QuoteList from "../components/quotes/QuoteList";

const DUMMY_DATA = [
    {id: 'q1', author: 'Annie', text: 'Learning React is fun!'},
    {id: 'q2', author: 'Banani', text: 'Learning React is great!'},
]

export const AllQuotes = () => {
    return <QuoteList quotes={DUMMY_DATA}/>
};