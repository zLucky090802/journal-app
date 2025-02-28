export const fileUpload = async(file) => {
  // if(!file) throw new Error('no tenemos ningun archivo a subir');
  
  if (!file || file.size === 0) return null; // Si no hay archivo, retorna null inmediatamente

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dhajrl9yl/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file)

  try {
    const resp = await fetch( cloudUrl, {
        method: 'POST',
        body: formData
    });
   
    if( !resp.ok ) throw new Error('No se pudo subir imagen')
    
    const cloudResp = await resp.json();
    
    
    return cloudResp.secure_url;


  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }

}