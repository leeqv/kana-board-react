async function getJishoData(input: string) {
  /**
   * Option 2: Call Jisho API
   *
   * Need to use a backend as a middleman because browsers enforce CORS,
   * so React cannot call the Jisho API directly React ↔ Jisho API ❌
   *
   * const url = "https://jisho.org/api/v1/search/words?keyword=" + input;
   */
  // const url = `http://localhost:8080/api?keyword=${input}`;
  const url = `/api?keyword=${input}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const results = await response.json();
    return [results];
  } catch (error: unknown) {
    return [null, error];
  }
}

export default getJishoData;
