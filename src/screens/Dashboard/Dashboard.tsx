import { PlusCircleFill } from 'react-bootstrap-icons';
import './Dashboard.css';
import { use, useEffect, useState } from 'react';
import WebService from '../../utility/WebService';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import AddJob from '../AddJob/AddJob';

const Dashboard = () => {
    const [userData, setUserData] = useState<any>(null);
    const [jobData, setJobData] = useState<any[]>([]);
    const [showAddJobModal, setShowAddJobModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUserDetail();
        getJobs();
    }, [])


    const getUserDetail = () => {
        WebService.getAPI({
            action: `users/me`
        })
            .then((res: any) => {
                setUserData(res)
            })
            .catch((err: any) => {
                toast.error(err);
            });
    }

    const getJobs = () => {
        WebService.getAPI({
            action: `jobs/list`
        })
            .then((res: any) => {
                setJobData(res?.list);
            })
            .catch((err: any) => {
                toast.error(err);
            });
    }

    const buyCoins = () => {
        setIsLoading(true);
        WebService.postAPI({
            action: `wallet/recharge`
        })
            .then((res: any) => {
                toast.success("Coins purchased successfully!");
                getUserDetail();
                setIsLoading(false);
            })
            .catch((err: any) => {
                toast.error(err);
                setIsLoading(false);
            });
    }

    const applyJob = (jobId: string) => {
        setIsLoading(true);
        WebService.postAPI({
            action: `jobs/apply-for-job`,
            body: {
                jobId: jobId
            }
        })
            .then((res: any) => {
                toast.success("Job applied successfully!");
                getUserDetail();
                getJobs();
                setIsLoading(false);
            })
            .catch((err: any) => {
                toast.error(err?.response?.data?.message || "Failed to apply for job");
                setIsLoading(false);
            });
    }

    return (
        <>
            <AddJob show={showAddJobModal} handleClose={() => {
                setShowAddJobModal(false)
                getJobs();
            }} />
            <div className='dashboard'>
                <div className='header'>
                    <div className='header-title'>JOB POSTING</div>
                    <div className='d-flex align-items-center justify-content-end'>
                        <button className="btn btn-light me-5 d-flex align-items-center mt-2 add-button" onClick={() => setShowAddJobModal(true)}>
                            <PlusCircleFill color='black' size={26} className=' me-3 cursor-pointer' onClick={() => setShowAddJobModal(true)} />
                            <span className='opacity'>Add Job</span>
                        </button>

                        <div className="position-relative d-inline-block">
                            <img
                                src={require('../../assets/profile.jpeg')}
                                className="cursor-pointer small-profile-image"
                                alt="User Logo"
                                onClick={() => setShowDropdown((prev) => !prev)}

                            />
                            {showDropdown && (
                                <div className="dropdown-menu show" style={{ position: 'absolute', right: 10, top: '100%', minWidth: 120 }}>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            setShowDropdown(false);
                                            localStorage.removeItem("token");
                                            window.location.href = "/login";
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center mt-4'>
                    <img src={require('../../assets/profile.jpeg')} className='profile-image' />
                </div>
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <div className='user-name'>{userData?.name}</div>
                </div>
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <div className='token-block'>
                        <div className='token-title'>Coins</div>
                        <div className='token-value'>{userData?.coins}</div>
                    </div>
                </div>
                <Row className='p-3'>
                    {jobData && jobData.length > 0 && jobData.map((job, index) => {
                        return (
                            <Col md={4} key={index}>
                                <div className='job-card'>
                                    <div className='job-title'>{job?.title}</div>
                                    <div className="d-flex align-items-center mb-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            fill="currentColor"
                                            className="bi bi-geo-alt-fill me-2"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                        </svg>
                                        <span className="job-location">{job.location || "Remote"}</span>
                                    </div>
                                    <div className='job-description'>{job?.description}</div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button className="btn btn-primary apply-button" onClick={() => applyJob(job.id)}>
                                            Apply Job ({job?.coins_required_for_apply} Coins)
                                        </button>
                                        <button className="btn btn-success buy-token-button" onClick={() => buyCoins()}>
                                            {isLoading ? (
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            ) : null}
                                            Buy Coins
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>

                {
                    jobData && jobData.length === 0 && (
                        <div className="text-center mt-5">
                            <h5>No jobs found.</h5>
                            <p className="text-muted">Create your first job using the <b className='cursor-pointer' onClick={() => setShowAddJobModal(true)}>Add Job</b> button above.</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Dashboard;