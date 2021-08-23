
export default async function parseCSV( data: string|File ){
    let dataString: string = '';
    if(data instanceof File){
        const readFile = new Promise<string>((res, rej) => {
            const reader = new FileReader()
            reader.onabort = () => rej(new Error('file reading was aborted'));
            reader.onerror = () => rej(new Error('file reading has failed'));
            reader.onload = () => {
              res(reader.result as string)
            }
            reader.readAsText(data)
        })
        dataString = await readFile;
    }
    return dataString;
}