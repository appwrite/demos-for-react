import React, { useEffect, useState } from "react";
import {
  creatUserDocument,
  deleteUserDocument,
  getUserData,
  getUserDocuments,
  updateUserDocument
} from "../../actions";
import Spinner from "../../helpers/Spinner";
import { Link, Redirect } from "react-router-dom";
import {
  Table,
  Icon,
  Menu,
  Grid,
  Segment,
  Button,
  Modal,
  Header,
  Form,
  Message
} from "semantic-ui-react";

const Users = () => {
  const [profile, setProfile] = useState(null);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [visibleUpdateModal, setVisibleUpdateModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserData()
      .then(response => {
        setProfile(response);
        getUserDocuments().then(({ documents }) => setUsersList(documents));
      })
      .catch(() => setProfile(false));
  }, []);

  const handleAddUser = () => {
    setLoading(true);
    creatUserDocument({ userID, name, email })
      .then(() => {
        getUserDocuments().then(({ documents }) => setUsersList(documents));
        setLoading(false);
        setVisibleAddModal(false);
      })
      .catch(e => {
        setLoading(false);
        setError(e.message);
      });
  };

  const handleUpdateUser = documentID => {
    setLoading(true);
    updateUserDocument({ documentID, name, email })
      .then(() => {
        getUserDocuments().then(({ documents }) => setUsersList(documents));
        setLoading(false);
        setVisibleUpdateModal(false);
      })
      .catch(e => {
        setLoading(false);
        setError(e.message);
      });
  };

  const handleDeleteUser = documentID => {
    setLoading(true);
    deleteUserDocument(documentID)
      .then(() => {
        getUserDocuments().then(({ documents }) => setUsersList(documents));
        setLoading(false);
        setVisibleDeleteModal(false);
      })
      .catch(e => {
        setLoading(false);
        setError(e.message);
      });
  };

  if (profile) {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment textAlign={"center"}>
              <Grid>
                <Grid.Row columns={3} verticalAlign={"middle"}>
                  <Grid.Column />
                  <Grid.Column>
                    <h2>User Dashboard</h2>
                  </Grid.Column>
                  <Grid.Column textAlign={"right"}>
                    <Link to={"/"}>
                      <Button>Home</Button>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column computer={2} />
          <Grid.Column computer={12}>
            <Menu pointing>
              <Menu.Item
                icon={<Icon name="users" />}
                name="users"
                active={true}
              />
              <Menu.Menu position="right">
                <Modal
                  closeOnDimmerClick={false}
                  closeIcon
                  onClose={() => {
                    setVisibleAddModal(false);
                    setUserID("");
                    setName("");
                    setEmail("");
                    setError(null);
                  }}
                  onOpen={() => setVisibleAddModal(true)}
                  open={visibleAddModal}
                  size="small"
                  trigger={
                    <Menu.Item
                      icon={<Icon name="add user" />}
                      name="add-user"
                    />
                  }
                >
                  <Header icon>
                    <Icon name="add user" />
                    Add User
                  </Header>
                  <Modal.Content>
                    {error && (
                      <Message error>
                        <Message.Header>Error</Message.Header>
                        {error}
                      </Message>
                    )}
                    <Form onSubmit={handleAddUser}>
                      <Form.Field>
                        <label>UserID</label>
                        <input
                          type={"text"}
                          value={userID}
                          onChange={e => setUserID(e.target.value)}
                          placeholder="UserID"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Name</label>
                        <input
                          type={"text"}
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Name"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Email</label>
                        <input
                          type={"email"}
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="Email"
                        />
                      </Form.Field>
                      <Button
                        color={"green"}
                        loading={loading}
                        inverted
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Modal.Content>
                </Modal>
              </Menu.Menu>
            </Menu>

            <Segment>
              <Table celled inverted selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>UserID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {usersList.map((user, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>{user.userID}</Table.Cell>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell textAlign={"right"}>
                        <Modal
                          closeOnDimmerClick={false}
                          closeIcon
                          onClose={() => {
                            setVisibleUpdateModal(false);
                            setName("");
                            setEmail("");
                            setError(null);
                          }}
                          onOpen={() => {
                            setVisibleUpdateModal(true);
                            setName(user.name);
                            setEmail(user.email);
                          }}
                          open={visibleUpdateModal}
                          size="small"
                          trigger={<Button icon={<Icon name={"edit"} />} />}
                        >
                          <Header icon>
                            <Icon name="user" />
                            Update User: {user.name}
                          </Header>
                          <Modal.Content>
                            {error && (
                              <Message error>
                                <Message.Header>Error</Message.Header>
                                {error}
                              </Message>
                            )}
                            <Form onSubmit={() => handleUpdateUser(user.$id)}>
                              <Form.Field>
                                <label>UserID</label>
                                <input
                                  type={"text"}
                                  defaultValue={user.userID}
                                  placeholder="UserID"
                                />
                              </Form.Field>
                              <Form.Field>
                                <label>Name</label>
                                <input
                                  type={"text"}
                                  value={name}
                                  onChange={e => setName(e.target.value)}
                                  placeholder="Name"
                                />
                              </Form.Field>
                              <Form.Field>
                                <label>Email</label>
                                <input
                                  type={"email"}
                                  value={email}
                                  onChange={e => setEmail(e.target.value)}
                                  placeholder="Email"
                                />
                              </Form.Field>
                              <Button
                                color={"green"}
                                loading={loading}
                                inverted
                                type="submit"
                              >
                                Update
                              </Button>
                            </Form>
                          </Modal.Content>
                        </Modal>
                        <Modal
                          closeOnDimmerClick={false}
                          closeIcon
                          dimmer={"inverted"}
                          onClose={() => {
                            setVisibleDeleteModal(false);
                            setError(null);
                          }}
                          onOpen={() => setVisibleDeleteModal(true)}
                          open={visibleDeleteModal}
                          size="small"
                          trigger={
                            <Button
                              color={"red"}
                              icon={<Icon name={"user delete"} />}
                            />
                          }
                        >
                          <Header icon>
                            <Icon name="user delete" />
                            Delete User: {user.name}
                          </Header>
                          <Modal.Content>
                            {error && (
                              <Message error>
                                <Message.Header>Error</Message.Header>
                                {error}
                              </Message>
                            )}
                            <Form onSubmit={() => handleDeleteUser(user.$id)}>
                              <Form.Field>
                                Are you sure to delete this user?
                              </Form.Field>
                              <Button
                                color={"red"}
                                loading={loading}
                                inverted
                                type="submit"
                              >
                                Delete
                              </Button>
                            </Form>
                          </Modal.Content>
                        </Modal>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                  {usersList.length === 0 && (
                    <Table.Row>
                      <Table.Cell colSpan={4} textAlign={"center"}>
                        No users to view. Add new users to view them here.
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={2} />
        </Grid.Row>
      </Grid>
    );
  } else if (profile === false) {
    return <Redirect to={"/login"} />;
  } else {
    return <Spinner />;
  }
};

export default Users;
