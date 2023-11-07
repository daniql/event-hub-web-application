import React, { useState, useEffect } from "react";
import "../../css/pages/host_profile/Host_Profile.css";
import Cards from "../components/Cards";
import { MdEdit } from "react-icons/md";
import HostSidebar from "../components/HostSidebar";
import EventCategory from "../components/EventCategory";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
  Outlet,
  useParams,
  useOutletContext,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import { useGetHostInfo } from "../useGetHostInfo";
import { confirmPassword } from "../confirmPassword";

export default function Host_root() {
  const { hostId = "" } = useParams();
  const { hostInfo, loading } = useGetHostInfo(hostId);
  return (
    <>
      <Navbar />
      <HostSidebar
        hid={hostInfo.hid}
        name={hostInfo.name}
        email={hostInfo.email}
        bio={hostInfo.bio}
      />
      <Outlet context={[hostInfo]} />
    </>
  );
}

export function Host_profile() {
  const [hostInfo] = useOutletContext();
  return (
    <>
      <div>
        <div className="createEventBtnContainer">
          <Link to={`/hosts/${hostInfo.hid}/create_event`}>
            <Button variant="primary">Create Event</Button>
          </Link>
        </div>

        <div className="host--events">
          <EventCategory
            title="Upcoming Events"
            link={`/hosts/${hostInfo.hid}/upcoming`}
          />
          <hr />
          <div className="previous--events">
            <EventCategory
              title="Previous Events"
              link={`/hosts/${hostInfo.hid}/previous`}
            />
          </div>
        </div>
      </div>
      <Outlet context={[hostInfo]} />
    </>
  );
}

export function Host_upcoming() {
  const [hostInfo] = useOutletContext();
  return (
    <>
      <div className="user--events">
        <div className="profile--category">
          <div className="card--header">
            <h2 className="card--heading">Upcoming Events</h2>
            <span className="card--see-all small">
              <a href={`/hosts/${hostInfo.hid}`}>Return to Profile</a>
            </span>
          </div>
          <div>{hostInfo.bio}</div>
          <Cards />
          <Cards />
          <Cards />
        </div>
      </div>
    </>
  );
}

export function Host_previous() {
  const [hostInfo] = useOutletContext();
  return (
    <>
      <div className="user--events">
        <div className="profile--category">
          <div className="card--header">
            <h2 className="card--heading">Previous Events</h2>
            <span className="card--see-all small">
              <a href={`/hosts/${hostInfo.hid}`}>Return to Profile</a>
            </span>
          </div>
          <Cards />
          <Cards />
          <Cards />
        </div>
      </div>
    </>
  );
}

export function Host_edit() {
  const [hostInfo] = useOutletContext();
  const ownerInfo = fetch(`/api/accounts/${hostInfo.owner}`).then((res) =>
    res.json()
  );

  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleProfileDelete = async () => {
    const body = {
      name: ownerInfo.username,
      email: ownerInfo.email,
      events: userInfo.events,
      fav_events: userInfo.fav_events,
      orgs: userInfo.orgs,
      msgids: userInfo.msgids,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    for (let event of hsotInfo.orgs) {
      const orgInfo = await fetch(`/api/hosts/${org}`).then((res) =>
        res.json()
      );

      for (let event of orgInfo.events) {
        const eventRes = await fetch(`/api/events/${event}`, {
          method: "DELETE",
        });

        if (!eventRes.ok) {
          throw new Error("Failed to delete event");
        }
      }
      const orgRes = await fetch(`/api/hosts/${org}`, {
        method: "DELETE",
      });

      if (!orgRes.ok) {
        throw new Error("Failed to delete org");
      }
    }
    const accountRes = await fetch(`/api/accounts/${userInfo.uid}`, {
      method: "DELETE",
    });
  };

  const submitForm = (data) => {
    if (
      data.password === data.confirmPassword &&
      confirmPassword(ownerInfo.email, data.oldPassword)
    ) {
      const body = {
        name: hostInfo.name,
        email: data.email,
        bio: data.bio,
        events: hostInfo.events,
        owner: hostInfo.owner,
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

      fetch(`/api/hosts/${hostInfo.hid}`, requestOptions)
        .then((res) => {
          if (!res.ok) {
            console.log("error:", err);
          }
        })
        .then((data) => {
          navigate("/profile");
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your put operation:",
            error
          );
        });
      reset();
    } else if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
    } else {
      alert("Previous password incorrect");
    }
  };

  return (
    <>
      <div className="form">
        <h1 className="edit_header">Edit Host Profile</h1>
        <br />
        <Form>
          <Form.Group>
            <Form.Label>New Email</Form.Label>
            <br />
            <Form.Control
              type="text"
              placeholder="New Email"
              {...register("email", { maxLength: 50 })}
            />
            {errors.email?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Email cannot exceed 50 characters</small>
              </p>
            )}
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>New Bio</Form.Label>
            <br />
            <Form.Control
              type="text"
              placeholder="New Bio"
              {...register("bio", { maxLength: 120 })}
            />
            {errors.bio?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Bio cannot exceed 120 characters</small>
              </p>
            )}
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Previous Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Previous Password"
              {...register("oldPassword", { required: true })}
            />
            {errors.oldPassword?.type === "required" && (
              <p style={{ color: "red" }}>
                <small>Previous password is required</small>
              </p>
            )}
          </Form.Group>
          <br />
          <Form.Group>
            <Button variant="primary" onClick={handleSubmit(submitForm)}>
              Submit
            </Button>
            {"  "}
            <Link to={`/hosts/${hostInfo.hid}`}>
              <Button variant="primary">Cancel</Button>
            </Link>
          </Form.Group>
          <br />
          <Form.Group>
            <Button variant="danger" onClick={handleShowDelete}>
              Delete Profile
            </Button>
            <Modal show={showDelete} onHide={handleCloseDelete}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <br />
              <Modal.Body>
                Are you sure you want to delete your account? All of your data
                will be lost.
              </Modal.Body>
              <br />
              <Modal.Footer>
                <Button variant="danger" onClick={handleProfileDelete}>
                  Delete
                </Button>{" "}
                {"  "}
                <Button variant="secondary" onClick={handleCloseDelete}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}