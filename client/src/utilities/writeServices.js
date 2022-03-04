module.exports = {

    prepareFormData(data, filePath){
        // New instance of class
        let formData = new FormData();
      
        // Append reconfigured mixed data to new object
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('lightsaberColor', data.lightsaberColor);
        formData.append('sideOfForce', data.sideOfForce);
        formData.append('filmAppearances', data.filmAppearances);
        formData.append('characterImage', data.characterImage)
        if (filePath) {
            formData.append('filePath', filePath);
        }
        
        // Return object
        return formData;
      },

    
    getFilePathFromUrl(downloadUrl) {
        console.log(`Downloaded from DB: ${downloadUrl}`);

        const baseUrl = `https://firebasestorage.googleapis.com/v0/b/fullstack-assessment-2.appspot.com/o/`;
 
        let fileName = downloadUrl.replace(baseUrl, "");

        const indexOfEndPath = fileName.indexOf("?");
        fileName = fileName.substring(0, indexOfEndPath);


        console.log(`File in bucket for deletion: ${fileName}`);
        return fileName;
    },
    
};