import React, { useState } from "react";
import Axios from "axios";
import "./ContainerBox.css";
import UploadIcon from "../assets/nuvem.svg";

export default function ContainerBox() {
  const [image, setImg] = useState("");
  const [dataImg, setDataImg] = useState();
  const [progress, setProgress] = useState(0);

  function onChange(img) {
    document.querySelector(".imageBox ").classList.add("highlight");
    const data = new FormData();
    data.append("file", img.target.files[0]);
    Axios.post("https://uploadtesteraws.herokuapp.com/posts", data, {
      onUploadProgress: (progressEvent) => {        
        setProgress(
          `${Math.round((progressEvent.loaded / progressEvent.total) * 100)}`
        );
      },
    })
      .then((res) => {
        setImg(res.data.url);
        setDataImg(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert('Error ao enviar Imagem')
      });
  }

  return (
    <div className="containerBox">
      <div className="headerText">
        <h1>Upload de imagens para AWS-S3 e MongoDB</h1>
        <p>
          Imagens com até 2mb serão aceitas para upload e com limite de 5 envios
          por usuário <a href="http://www.github.com/raultocantins">Saiba Mais</a>
        </p>
      </div>
      <div className="imageBox">
        {image ? (
          <img src={image} className="imageUploaded" alt="imageUploaded" />
        ) : (
          <React.Fragment>
            <img src={UploadIcon} alt="upload-icon" className="uploadIcon" />

            <label className="custom-file-upload">
              <input type="file" onChange={onChange} className="input" />

              {progress ? (
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: "rgba(0, 128, 0, 0.747)",
                    borderRadius: "inherit",
                  }}
                />
              ) : (
                "Selecione uma imagem para upload"
              )}
            </label>
          </React.Fragment>
        )}
      </div>
      {dataImg ? (
        <div>
          <h4 style={{ fontSize: "13px" }}>Url da Image: {dataImg.url}</h4>
          <h4 style={{ fontSize: "13px" }}>Size: {dataImg.size}</h4>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
