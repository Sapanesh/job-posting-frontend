import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import WebService from "../../utility/WebService";
import { toast } from "react-toastify";
import { useState } from "react";

interface AddJobProps {
    show: boolean;
    handleClose: () => void;
}

const AddJob = ({ show, handleClose }: AddJobProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<any>({ mode: "onChange" });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data: any) => {
        setIsLoading(true);
        WebService.postAPI({
            action: `jobs`,
            body: data
        })
            .then((res: any) => {
                toast.success("Job added successfully!");
                handleClose();
                reset();
                setIsLoading(false);
            })
            .catch((err: any) => {
                toast.error(err?.response?.data?.message || "Failed to add job");
                setIsLoading(false);
            });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="jobTitle" className="form-label">Job Title</label>
                        <input type="text" className="form-control" placeholder="Enter job title" {...register("title", { required: true })} />
                        {errors.title && <span className="text-danger">Job Title is required</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="jobDescription" className="form-label">Job Description</label>
                        <textarea className="form-control" rows={3} placeholder="Enter job description" {...register("description", { required: true })}></textarea>
                        {errors.description && <span className="text-danger">Job Description is required</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="jobTitle" className="form-label">Coins Requires to Apply Job</label>
                        <input type="text" className="form-control" placeholder="Enter coins required" {...register("coins_required_for_apply", { required: true })} />
                        {errors.coins_required_for_apply && <span className="text-danger">Coins Required is required</span>}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
                    {isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddJob;