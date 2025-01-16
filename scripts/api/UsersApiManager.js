class UsersApiManager {
  static async getUsers() {
    return RequestManager.fetchData("/users");
  }
  static async getUserById(id) {
    return RequestManager.fetchData(`/users/register/${id}`);
  }
  static async addUser(data, id) {
    return RequestManager.postRequest(
      `/users/register/${id}`,
      data,
      "./list.html"
    );
  }
  static async deleteUser(id) {
    return RequestManager.deleteRequest("/users", id);
  }
}
