import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import DOMPurify from "dompurify";
import PageServices from '../services/PageServices';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import { constant } from '../constant/index.constant';

function SingleBlogPage() {
  const navigate = useNavigate();
    const [blogData, setBlogData] = useState([]);
  const [singleBlogData, setSingleBlogData] = useState({});
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug: id } = useParams();

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(singleBlogData?.blogDescription),
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [allBlogsResponse, currentBlogResponse] = await Promise.all([
        PageServices.getBlogData({ page: 1, category: 'All' }),
        PageServices.getBlogDataById(id)
      ]);

      if (currentBlogResponse?.status === 'success') {
        setSingleBlogData(currentBlogResponse?.data?.blog);
        
        // Get all blogs excluding current one
        const allBlogs = allBlogsResponse?.data?.blog || [];
        const filteredBlogs = allBlogs.filter(x => x.Slug !== currentBlogResponse?.data?.blog?.Slug);
        setBlogData(filteredBlogs);
        
        // Get similar blogs (same category, limit to 3)
        const currentCategory = currentBlogResponse?.data?.blog?.category;
        const similar = filteredBlogs
          .filter(blog => blog.category === currentCategory)
          .slice(0, 3);
        setSimilarBlogs(similar);
      }
    } catch (error) {
      navigate(`/blog`);
    } finally {
      setLoading(false);
    }
  };

    const getAdjacentBlogs = () => {
    const allBlogs = [...blogData, singleBlogData].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    const currentIndex = allBlogs.findIndex(blog => blog.Slug === id);
    
    return {
      prevBlog: allBlogs[currentIndex + 1] || null,
      nextBlog: allBlogs[currentIndex - 1] || null
    };
  };

  const { prevBlog, nextBlog } = getAdjacentBlogs();

  return (
    <>
      <Helmet>
        {singleBlogData?.blogTitle ? <title>{singleBlogData?.blogTitle}</title> : <></>}
        {singleBlogData?.descriptions ? (
          <meta name="description" content={singleBlogData?.descriptions} />
        ) : (
          <></>
        )}
        {singleBlogData?.descriptions ? (
          <meta
            name="description"
            property="og:description"
            content={singleBlogData?.descriptions}
          />
        ) : (
          <></>
        )}
        {singleBlogData?.keyword ? (
          <meta name="keywords" content={singleBlogData?.keyword} />
        ) : (
          <></>
        )}
        {singleBlogData?.keyword ? (
          <meta name="keywords" property="og:keywords" content={singleBlogData?.keyword} />
        ) : (
          <></>
        )}
        {singleBlogData?.seoImage ? (
          <meta name="image" content={singleBlogData?.seoImage} />
        ) : (
          <></>
        )}
        {singleBlogData?.seoImage ? (
          <meta name="image" property="og:image" content={singleBlogData?.seoImage} />
        ) : (
          <></>
        )}
        {singleBlogData?.blogTitle ? (
          <meta name="title" content={singleBlogData?.blogTitle} />
        ) : (
          <></>
        )}
        {singleBlogData?.blogTitle ? (
          <meta name="title" property="og:title" content={singleBlogData?.blogTitle} />
        ) : (
          <></>
        )}
        {singleBlogData?.robotContent ? (
          <meta name="robots" content={singleBlogData?.robotContent} />
        ) : (
          <></>
        )}
      </Helmet>
      <div>
        {/* ======== hero section start ===== */}
        <section>
          <div className="banner-sec new-banner-sec single-blog-banner">
            <div className="container">
              <div className="banner-content text-left">
                <h1 className="banner-heading">{singleBlogData?.blogTitle}</h1>
              </div>
            </div>
          </div>
        </section>
        {/* ======== hero section end ===== */}
        <section className="blog-content-section py-60">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                

                <div className="col-12 mb-3">
                  <img width="100%" src={`${constant.REACT_APP_URL}/uploads/${singleBlogData.image}`} alt={`${constant.REACT_APP_URL}/uploads/${singleBlogData.image}`} />
                </div>
                <div className="blog-content-section-left">
                  <div dangerouslySetInnerHTML={sanitizedData()}></div>
                  <div className="blog-navigation mb-4 d-flex justify-content-between">
                  {prevBlog ? (
                    <Link
                      to={`/blog-description/${prevBlog?.Slug}`}
                      className="site-btn px-3"
                    >
                     Previous
                    </Link>
                  ) : <div></div>}

                  {nextBlog ? (
                    <Link
                      to={`/blog-description/${nextBlog?.Slug}`}
                      className="site-btn px-3"
                    >
                      Next
                    </Link>
                  ) : <div></div>}
                </div>
                  <div className="share-blog-section">
                    <ul className="list-unstyled">
                      <li><Link target='_blank' to={`${constant.SOCIAL_MEDIA_LINK.FB}/?u=${constant.REACT_APP_URL}/blog-description/${singleBlogData.Slug}`} className="share-fb"><span><i className="fa fa-facebook" /></span>Facebook</Link></li>
                      <li><Link target='_blank' to={`${constant.SOCIAL_MEDIA_LINK.TWITTER}/?url=${constant.REACT_APP_URL}/blog-description/${singleBlogData.Slug}`} className="share-twi"><span><i className="fa fa-twitter" /></span>Twitter</Link></li>
                      <li><Link target='_blank' to={`${constant.SOCIAL_MEDIA_LINK.LINKEDIN}${constant.REACT_APP_URL}/blog-description/${singleBlogData.Slug}`} className="share-link"><span><i className="fa fa-linkedin" /></span>Linkedin</Link></li>
                      {/* <li><span><i className="fa fa-share-alt" /></span><span>0<br />Share</span></li> */}
                    </ul>
                  </div>
                  <div className="post-comment-section">
                    <h4>Leave a Reply</h4>
                    <p>Your email address will not be published.</p>
                    <form className="post-comment-form">
                      <div className="row gy-3">
                        <div className="col-md-6">
                          <div className="input-field">
                            <input type="text" name="name" placeholder="Name" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-field">
                            <input type="email" name="email" placeholder="Email" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="input-field">
                            <textarea placeholder="Comment" className="form-control" rows={3} defaultValue={""} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="input-field">
                            <button type="submit" className="post-cmnt-btn site-btn">Post Comment </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="blog-content-section-right ps-4">
                  <div className="blog-search-box mb-50">
                    <h5>Search</h5>
                    <div className="blog-search-box-inner">
                      <input type="search" name="search" className="form-control" />
                      <button><i className="fa fa-search" /></button>
                    </div>
                  </div>
                  <div className="latest-post-section mb-50">
                    <h5>Latest Post</h5>
                    <div className="latest-post-section-inner">
                      {blogData && blogData?.slice(0, 2).map((blog) => (
                        <div key={blog.Slug} className="latest-post-card">
                          <div className="latest-post-card-img">
                            <img src={`${constant.REACT_APP_URL}/uploads/${blog.image}`} alt='Blog Banner' />
                          </div>
                          <div className="latest-post-card-body">
                            <h6><Link to={`/blog-description/${blog.Slug}`}>{blog.blogTitle}</Link></h6>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                  <div className="mb-50 categories-sec">
                    <h5>Categories</h5>
                    <div className="categories-sec-inner">
                      <ul className="list-unstyled">
                        <li><Link to={`/blog`}>GMAT</Link></li>
                        <li><Link to={`/blog`}>TOEFL</Link></li>
                        <li><Link to={`/blog`}>IELTS</Link></li>
                        <li><Link to={`/blog`}>GRE</Link></li>
                        <li><Link to={`/blog`}>PTE</Link></li>
                        <li><Link to={`/blog`}>SAT</Link></li>
                        <li><Link to={`/blog`}>SPOKEN ENGLISH</Link></li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======== become partner section start ===== */}
        <section className="app-banner-section">
          <div className="container">
            <div className="app-banner-section-inner app-banner-section-inner-2">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="app-banner-content-left">
                    <h2 className="mb-3">Have a question about GMAT?</h2>
                    <p className="mb-4">Want some help figuring out what kind of prep service is right for you?</p>
                    <Link className="site-btn" to="/contact">Help &amp; Support</Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="app-banner-content-right text-center">
                    <img src="assets/img/help-support-img.svg" alt="partner" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default memo(SingleBlogPage)