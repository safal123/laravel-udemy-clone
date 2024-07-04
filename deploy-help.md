# Creat a non sudo user
#### Let's create a non-sudo user for security reasons. The name of the user is 'laravel'. And give the sudo admin access to the user.
```bash
sudo adduser laravel
sudo usermod -aG sudo laravel
```
