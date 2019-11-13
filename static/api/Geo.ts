interface IMetro {
    caption: string;
    line: string;
    id: string;
}

/**
 * Апи для получения актуального списка станций метро
 */
export async function getMetroStations(): Promise<IMetro[]> {
    const apiUrl = 'https://apidata.mos.ru/v1/datasets/1488/rows?api_key=fb1fec8ca7516ede86bf758021706c07';
    const response = await fetch(apiUrl, {
        method: 'get'
    });
    const jsonData = await response.json();
    let stations = [];
    try {
        stations = jsonData.map(({Cells: {global_id, Station, Line}} : any) => ({
            id: global_id,
            caption: Station,
            line: Line,
        }));
    } catch (e) {
        console.error(e);
    }
    return stations;
}
