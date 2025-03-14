# To-Do List

### Frontend
- [x] Add post in profile page.
- [ ] Replace unclickable button in header with a remove button when authenticated.
- [x] Fix text not being copyable in items on the home page.
- [ ] Source trace and comment all code.
- [x] The Follow button only works when user switch tabs.
- [ ] Profile page bug: (like button only works when user switch tabs, delete not working).
- [ ] Noti count only works when user switch tabs.


### Backend
- [ ] Comment like not work.
- [ ] Use Express Validator for API validation.
- [ ] Remove user password using `omitApi` when fetching user data (page 324). 
  - Reference: [Prisma Excluding Fields](https://www.prisma.io/docs/orm/prisma-client/queries/excluding-fields)
- [ ] Update API to refetch data correctly (page 332).
- [x] Fix password functionality (not working).
- [ ] Fix update API errors (e.g., `/notis/read/:id`).
- [ ] Ensure "read notification" disappears after a reasonable time.

### Features
- [ ] Learn and implement `FollowedButton` on Profile and UserList (line 21).
  - Reference:
    ```javascript
    // await queryClient.refetchQueries("users");
    // await queryClient.invalidateQueries(`users/${user.id}`);
    ```
- [ ] Fix like/unlike functionality on posts in the comment page.
- [ ] Add reply-like notifications.
- [ ] Fix duplicate notifications showing.
- [ ] Page 392: Implement new feature.
- [ ] Edit prifle.

## Development Commands

### Frontend
`npm run dev`

### Backend
`npx nodemon index.js`
`npx prisma studio`