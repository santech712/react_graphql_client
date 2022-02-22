import React from "react";
import { useMutation, gql } from "@apollo/client";

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!){
        uploadFile(file: $file){
            url
        }
    }
`

const Upload_Image_Data = gql`
    mutation uploadImageData($imageData: ImageData){
        uploadImageData(imageData: $imageData){
            url
            name
        }
    }
`;


export default function UploadForm() {

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    })

    const [uploadImageData] = useMutation(Upload_Image_Data, {
        onCompleted: data => console.log(data)
    })

    const handleFileChange = e => {
        const file = e.target.files[0]
        if(!file) return
        console.log("Just uploading!");
        //uploadFile({ variables: { file }})

        const sendImageData = {
            image: file,
            name: "hello world"
        };

        uploadImageData({variables: {imageData: sendImageData}})
    }
    return (
        <div>
            <h1>Upload File</h1>
            <input type="file" onChange={handleFileChange} />
        </div>
    )
}