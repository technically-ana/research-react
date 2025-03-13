
export default function Home() {
  return (
      <section className="section">
          <div className="container">
              <div className="columns ">
                  <div className="column is-4">
                      <div className="box">
                          <h1 className="title has-text-centered">Login</h1>
                          <form>
                              <div className="field">
                                  <label className="label">Email</label>
                                  <div className="control">
                                      <input
                                          className="input"
                                          type="email"
                                          placeholder="youremail@example.com"/>
                                  </div>
                              </div>
                              <div className="field">
                                  <label className="label">Password</label>
                                  <div className="control ">
                                      <input
                                          className="input"
                                          type="password"
                                          placeholder="********"
                                          required/>
                                  </div>
                              </div>

                              <div className="field">
                                  <div className="control has-text-centered mt-5 btn-container">
                                      <button
                                          className="btn btn-large"
                                          type="submit">Login
                                      </button>
                                  </div>
                              </div>
                              <div className="notification is-danger is-light mt-4">
                                  no error
                              </div>
                          </form>
                          <div className="has-text-centered mt-5 btn-container">
                              <button className="btn">About</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
}
