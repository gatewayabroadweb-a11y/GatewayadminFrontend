import { React, useState, useEffect } from 'react'
import useAsync from '../hooks/useAsync';
import PageServices from '../services/PageServices';
import DocumentMeta from 'react-document-meta';
import { Link, useLocation } from 'react-router-dom';
import { constant } from '../constant/index.constant';
import Slider from 'react-slick';
import { youtubeSlider } from '../custom/custom';

function GellaryF() {
  const location = useLocation();
  const isGallary = location.pathname === "/gallary";

  const { data } = useAsync(PageServices.getPhoto);
  const { data: videoData } = useAsync(PageServices.getYoutubeVideo);

  const [form, setform] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (data?.data?.media) {
      setform(data.data.media || []);
    }
    if (videoData?.data?.media) {
      setVideos(videoData.data.media || [])
    }
  }, [data, videoData]);

  const meta = {
    title: 'Gallery',
    description: 'Learn about our company.',

  };
  return (
    <>
      <DocumentMeta {...meta} />
      <div className="banner-sec new-banner-sec gallery-banner">
        <div className="container">
          <div className="banner-content text-center">
            <h1 className="banner-heading ">Gallery</h1>
          </div>
        </div>
      </div>
      <div className="container center-block">
        <div className="row justify-content-center">
          <div className="col-6">
            <ul className="nav nav-pills mb-3 mt-2" id="pills-tab" role="tablist">
              <li className="nav-item mx-auto">
                <Link className={`nav-link ${isGallary ? 'active' : ""}`} to='/gallary'>Photos</Link>
              </li>
              <li className="nav-item mx-auto">
                <Link className={`nav-link ${!isGallary ? 'active' : ""}`} to='/videos'>Videos</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isGallary ?
        <>
          <div className="container">
            <div className="row">
              {form.map((g, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6" data-toggle="modal" data-target="#modal">
                  <a href="#lightbox" data-slide-to={index.toString()}>
                    <img alt="" src={`${constant.REACT_APP_URL}/uploads/${g.mediaLink}`} className="img-thumbnail my-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="Lightbox Gallery by Bootstrap 4" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <div id="lightbox" className="carousel slide" data-ride="carousel" data-interval="5000" data-keyboard="true">
                    <ol className="carousel-indicators">
                      {form.map((g, index) => (
                        <li key={index} data-target="#lightbox" data-slide-to={index.toString()}></li>
                      ))}
                    </ol>
                    <div className="carousel-inner">
                      {form.map((g, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                          <img src={`${constant.REACT_APP_URL}/uploads/${g.mediaLink}`} style={{ maxHeight: 'calc(100vh - 20vh)' }} className="w-100" alt="" />
                        </div>
                      ))}
                    </div>
                    <a className="carousel-control-prev" href="#lightbox" role="button" data-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span><span className="sr-only">Previous</span></a>
                    <a className="carousel-control-next" href="#lightbox" role="button" data-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span><span className="sr-only">Next</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </> :
        <div className="container py-70">
          <div className="row">
            <Slider {...youtubeSlider} className="student-yt-slider">
              {videos.map((video) => (
                <div className="student-yt-slider-inner" key={video._id}>
                  <iframe loading='eager' width={520} height={310} src={`https://www.youtube.com/embed/${video.mediaLink}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      }
    </>
  )
}

export default GellaryF