# User API Documentation

This API provides functionality to manage users in the application. It supports creating, reading, updating, and deleting user records.

## Create User

### Request

```
POST /api/user.create
```

**Input Schema (createUserInput):**

| Field      | Type   | Description                |
| ---------- | ------ | -------------------------- |
| email | string | Email address of the user. Must be from one of the allowed domains: `example.com`, `anotherdomain.com`, or `gmail.com`. |
| first_name | string | First name of the user     |
| last_name  | string | Last name of the user      |
| username   | string | Username for the user      |
| password   | string | Password for the user      |

### Response

If the user is created successfully, it will return the created user object.

## Get User

### Request

```
GET /api/user.get
```

**Input Schema (getUserInput):**

| Field    | Type   | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| id       | string | MongoDB ObjectId of the user (optional)        |
| username | string | Username of the user (optional)                |
| email    | string | Email address of the user (optional)           |

### Response

If a user is found, it will return the user object.

## Get Users

### Request

```
GET /api/user.getAll
```

**Input Schema (getUsersInput):**

| Field | Type   | Description                                 |
| ----- | ------ | ------------------------------------------- |
| page  | number | Page number for pagination (default: 1)     |
| limit | number | Number of results per page (default: 10)    |

### Response

If users are found, it will return an array of user objects.

## Update User

### Request

```
PATCH /api/user.update
```

**Input Schema (updateUserInput):**

| Field      | Type   | Description                               |
| ---------- | ------ | ----------------------------------------- |
| id         | string | MongoDB ObjectId of the user              |
| username   | string | New username for the user (optional)      |
| first_name | string | New first name for the user (optional)    |
| last_name  | string | New last name for the user (optional)     |
| password   | string | New password for the user (optional)      |

### Response

If the user is updated successfully, it will return the updated user object.

## Delete User

### Request

```
DELETE /api/user.delete
```

**Input Schema (deleteUserInput):**

| Field | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| id    | string | MongoDB ObjectId of the user  |

### Response

If the user is deleted successfully, it will return the deleted user object.

---

# Content API Documentation

This API provides functionality to manage content in the application. It supports creating, reading, updating, and deleting content records.

## Create Content

### Request

```
POST /api/content.create
```

**Input Schema (createContentInput):**

| Field                     | Type   | Description                                      |
| ------------------------- | ------ | ------------------------------------------------ |
| user_mongo_id             | string | MongoDB ObjectId of the user                     |
| title                     | string | Title of the content                             |
| user_prompt               | string | User prompt for the content (optional)           |
| blog_mongo_id             | string | MongoDB ObjectId of the associated blog (optional) |
| linkedin_post_mongo_id    | string | MongoDB ObjectId of the associated LinkedIn post (optional) |
| youtube_transcript_mongo_id | string | MongoDB ObjectId of the associated YouTube transcript (optional) |

### Response

If the content is created successfully, it will return the created content object.

## Get Content

### Request

```
GET /api/content.get
```

**Input Schema (getContentInput):**

| Field                     | Type   | Description                                      |
| ------------------------- | ------ | ------------------------------------------------ |
| id                        | string | MongoDB ObjectId of the content (optional)       |
| user_mongo_id             | string | MongoDB ObjectId of the user (optional)          |
| title                     | string | Title of the content (optional)                  |
| blog_mongo_id             | string | MongoDB ObjectId of the associated blog (optional) |
| linkedin_post_mongo_id    | string | MongoDB ObjectId of the associated LinkedIn post (optional) |
| youtube_transcript_mongo_id | string | MongoDB ObjectId of the associated YouTube transcript (optional) |
| from_date                 | date   | Start date for filtering by creation date (optional) |
| to_date                   | date   | End date for filtering by creation date (optional) |

**Note:** At least one of the fields (id, user_mongo_id, title, blog_mongo_id, linkedin_post_mongo_id, youtube_transcript_mongo_id) is required.

### Response

If content is found, it will return an array of content objects matching the provided criteria.

## Get Contents

### Request

```
GET /api/content.getAll
```

**Input Schema (getContentsInput):**

| Field | Type   | Description                                 |
| ----- | ------ | ------------------------------------------- |
| page  | number | Page number for pagination (default: 1)     |
| limit | number | Number of results per page (default: 10)    |

### Response

If contents are found, it will return an array of content objects.

## Update Content

### Request

```
PATCH /api/content.update
```

**Input Schema (updateContentInput):**

| Field                     | Type   | Description                                      |
| ------------------------- | ------ | ------------------------------------------------ |
| id                        | string | MongoDB ObjectId of the content                  |
| title                     | string | New title for the content (optional)             |
| user_prompt               | string | New user prompt for the content (optional)       |
| blog_mongo_id             | string | New MongoDB ObjectId of the associated blog (optional) |
| linkedin_post_mongo_id    | string | New MongoDB ObjectId of the associated LinkedIn post (optional) |
| youtube_transcript_mongo_id | string | New MongoDB ObjectId of the associated YouTube transcript (optional) |

### Response

If the content is updated successfully, it will return the updated content object.

## Delete Content

### Request

```
DELETE /api/content.delete
```

**Input Schema (deleteContentInput):**

| Field | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| id    | string | MongoDB ObjectId of the content |

### Response

If the content is deleted successfully, it will return a success message with the deleted content ID.

---

# Blog API Documentation

This API provides functionality to manage blogs in the application. It supports creating, reading, updating, and deleting blog records.

## Create Blog

### Request

```
POST /api/blog.create
```

**Input Schema (createBlogInput):**

| Field          | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| content_mongo_id | string | MongoDB ObjectId of the associated content      |
| blog_details   | string | Details of the blog                              |
| image_url      | string | URL of the blog image (optional)                 |
| sources        | string | Sources for the blog (optional)                  |
| comment        | object | Comment object with blog_id and message (optional) |
| likes          | number | Number of likes on the blog (optional)           |

### Response

If the blog is created successfully, it will return the created blog object.

## Get Blog

### Request

```
GET /api/blog.get
```

**Input Schema (getBlogInput):**

| Field          | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| id             | string | MongoDB ObjectId of the blog (optional)          |
| content_mongo_id | string | MongoDB ObjectId of the associated content (optional) |
| from_date      | date   | Start date for filtering by creation date (optional) |
| to_date        | date   | End date for filtering by creation date (optional) |

**Note:** At least one of the fields (id, content_mongo_id, from_date, or to_date) is required.

### Response

If blogs are found, it will return an array of blog objects matching the provided criteria.

## Get Blogs

### Request

```
GET /api/blog.getAll
```

**Input Schema (getBlogsInput):**

| Field | Type   | Description                                 |
| ----- | ------ | ------------------------------------------- |
| page  | number | Page number for pagination (default: 1)     |
| limit | number | Number of results per page (default: 10)    |

### Response

If blogs are found, it will return an array of blog objects.

## Update Blog

### Request

```
PATCH /api/blog.update
```

**Input Schema (updateBlogInput):**

| Field          | Type   | Description                                      |
| -------------- | ------ | ------------------------------------------------ |
| id             | string | MongoDB ObjectId of the blog (optional)          |
| content_mongo_id | string | MongoDB ObjectId of the associated content (optional) |
| blog_details   | string | New details for the blog (optional)              |
| image_url      | string | New URL of the blog image (optional)             |
| sources        | string | New sources for the blog (optional)              |
| comment        | object | New comment object with user_id and message (optional) |
| likes          | number | New number of likes on the blog (optional)       |

**Note:** Either `id` or `content_mongo_id` must be provided.

### Response

If the blog is updated successfully, it will return the updated blog object.

## Delete Blog

### Request

```
DELETE /api/blog.delete
```

**Input Schema (deleteBlogInput):**

| Field | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| id    | string | MongoDB ObjectId of the blog  |

### Response

If the blog is deleted successfully, it will return a success message with the deleted blog ID.

---