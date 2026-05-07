
import { fstat } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


export default (CaminhoDoArquivo,parametros) => {
    try {
        if (!CaminhoDoArquivo) {
            throw new Error('sem arquivo existente');
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        //aqui montamos a string que vai receber o caminho do arquivo que queremos deletar
        let filepath = `public/${parametros.usuarios}/${parametros.perfis}`;
        //este uploadpt e para pegar o caminho do arquivo que queremos deletar
        let uploadpath = `${__dirname}/../${filepath}`;
        //caminhodoarquivo guarda guarda o nome do arquivo que queremos deletar
        let CaminhoCompleto = `${uploadpath}${CaminhoDoArquivo}`;
        //fs e uma funcao do node para tratar arquivos com o unlinksync
        //ele vai receber o caminho completo do arquivo e na funcao pelo caminhoscompletos 
        //o unlinksyn vai se encarregar de deletar o arquivo completo
        fs.unlinkSync(CaminhoCompleto);
        (error) => {
            throw new Error(error.message);
            Error('error ao deletar aquivo');
        }



    }catch (error) {
        throw new Error(error.message)
    }

}