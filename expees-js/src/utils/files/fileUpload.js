import path from 'path';
import { fileURLToPath } from 'url';



export default async (file,parametros) => {
    try { 

        //import.meta.url pega o endereco do arquivo atual em formato url
        //fileurltopath converte a url em caminho de pastar 
        //e guarda o caminho no file name
        //vai guardar o caminho do arquivo 
        const __filename = fileURLToPath(import.meta.url);
        //o path.dirname pega e salva o caminho da pasta ate o filename
        //e salva tudo no dirname
        const __dirname = path.dirname(__filename);


        //aqui serve para extrair a extencao do arquivo
        //pegar somente o final dele .pdf .png
        let extensao = path.extname(file.name);

        
        //aqui vamos montar um texto uma string que vai receber o caminho da pasta
        //no caso aqui vamos montar onde vamos salvar o arquivo 

        let filepath = `public/${parametros.usuarios}/${parametros.perfis}`;
        //aqui vai ser o seguinte o dirname e onde o arquivo esta
        //o ../ e para voltar uma casa e o file patch e onde vamos salver ele 
        //e o uploadpatch e para dizer que queremos salvar o aquivo aqui

        let uploadpath = `${__dirname}/../${filepath}`;
        //o file e chamar a funcao de arquivo e o mv e de a funcao de mover e passamos o uploadpath para passar o caminho
        file.mv(uploadpath);
        return {
            type: 'sucess',
            message: 'upload feito',
            path: filepath
        }

    }catch (error) {
        throw new Error(error.message)
    }
}