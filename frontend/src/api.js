// @ts-check

import axios from 'axios'
import app from './main'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || `/api/`,
  withCredentials: true
})

export default {
  /**
   * @param {string} method
   * @param {string} resource
   * @param {object} [data]
   */
  async execute (method, resource, data) {
    if (app) app.$Progress.start()

    const request = axiosInstance({
      method,
      url: resource,
      data,
      validateStatus: () => true
    })

    request.then(() => {
      if (app) app.$Progress.finish()
    })

    return request
  },

  /* AUTHENTICATION */
  /**
   * Creates new session
   * @param {object} data
   * @param {string} data.username
   * @param {string} data.password
   */
  login (data) {
    return this.execute('POST', `/login`, {
      username: data.username,
      password: data.password
    })
  },

  /** Destroys current session */
  logout () {
    return this.execute('POST', `/logout`)
  },

  /**
   * Creates new user account
   * @param {object} data
   * @param {string} data.username
   * @param {string} data.email
   * @param {string} data.password
   */
  register (data) {
    return this.execute('POST', `/register`, {
      username: data.username,
      email: data.email,
      password: data.password
    })
  },

  /** Gets current logged in user */
  getUser () {
    return this.execute('GET', `/user`)
  },

  /**
   * Updates logged in user
   * @param {object} data
   * @param {string} [data.currentPassword]
   * @param {string} [data.password]
   * @param {string} [data.username]
   * @param {string} [data.email]
   */
  updateUser (data) {
    return this.execute('PATCH', `/user`, data)
  },

  /**
   * Sends email with link to reset password
   * @param {string} email
   */
  sendPasswordResetEmail (email) {
    return this.execute('POST', `/user/sendReset`, { email })
  },

  /**
   * Resets user password
   * @param {object} data
   * @param {string} data.token
   * @param {string} data.password
   */
  resetPassword (data) {
    return this.execute('POST', `/user/resetPassword`, data)
  },
  /**
   * Creates new user account
   * @param {object} data
   * @param {string} data.band
   * @param {string} data.model
   * @param {string} data.registrationNumber
   * @param {string} data.klasa
   * @param {string} data.role
   */
  insertCar (data) {
    return this.execute('POST', `/car`, {
      band: data.band,
      model: data.model,
      registrationNumber: data.registrationNumber,
      type: data.klasa,
      role: data.role
    })
  },
  listCars () {
    return this.execute('GET', `/cars`)
  },
  /**
  * Gets blog data
  * @param {string} carID
  */
  insertErrand (carID, data) {
    return this.execute('POST', `/errand/${carID}`, {
      startDate: data.startDate,
      role: data.role
    })
  },
  /**
   * Creates new blog
   * @param {object} data
   * @param {string} data.name
   */
  createBlog (data) {
    return this.execute('POST', `/blog`, data)
  },
  /**
   * Gets blog data
   * @param {string} blogID
   */
  getBlog (blogID) {
    return this.execute('GET', `/blog/${blogID}`)
  },

  /**
   * Updates blog
   * @param {string} blogID
   * @param {object} data
   * @param {string} [data.name]
   */
  updateBlog (blogID, data) {
    return this.execute('PUT', `/blog/${blogID}`, data)
  },
  /**
   * Deletes blog
   * @param {string} blogID
   */
  deleteBlog (blogID) {
    return this.execute('DELETE', `/blog/${blogID}`)
  },
  /**
   * list blogs
   * @param {string} all
   * @param {number} page
   */
  listBlogs (page) {
    return this.execute('GET', `/blog/?page=${page}`)
  },

  addImagePost (blogID, data) {
    return this.execute('POST', `/imagepost/${blogID}`, data)
  },

  // getImagePost (imageID) {
  //   return this.execute('GET', `/imagepost/${imageID}`)
  // },

  updateImagePost (imageID, data) {
    return this.execute('PUT', `/imagepost/${imageID}`, data)
  },

  deleteImagePost (imageID) {
    return this.execute('DELETE', `/imagepost/${imageID}`)
  },

  listImagePostsByBlog (blogID) {
    return this.execute('GET', `/imagepost/${blogID}`)
  }
}
