function KanjiSearch() {
  const input = 'あか';
  
  async function getData() {
    /**
     * Need to use a backend as a middleman because browsers enforce CORS,
     * so React cannot call the Jisho API directly React ↔ Jisho API ❌
     * 
     * const url = "https://jisho.org/api/v1/search/words?keyword=" + input;
     */
    const url = `http://localhost:8080/api?keyword=${input}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const results = await response.json();
      console.log(results);
    } catch (error: unknown) {
      if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('Unknown error', error);
			}
    }
  }

  return (
    <div className="search">
      <input 
        type="text" 
        className="search__input"
        />
      <button 
        type="button"
        onClick={getData}
        disabled={!input.length ? true : false}
        >
        Get kanji
      </button>
    </div>
  );
}

export default KanjiSearch;