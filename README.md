# Local PHP Stack

This workspace uses Homebrew Apache, PHP-FPM, and MariaDB.

## One-time setup

1. Install the packages if needed: `brew install httpd php mariadb`
2. Start PHP-FPM: `brew services start php`
3. Start MariaDB: `brew services start mariadb`
4. Load the sample database and user: `mariadb -u "$USER" < sql/init.sql`
5. Restart Apache so it picks up the local vhost: `brew services restart httpd`

## Run it

Open `http://localhost:8080/` in your browser.

## Stop it

Use `brew services stop httpd php mariadb`.

## Notes

- Apache is configured in `/opt/homebrew/etc/httpd/httpd.conf`.
- The project vhost is in `/opt/homebrew/etc/httpd/extra/httpd-vhosts.conf`.
- If you move this checkout, update the `DocumentRoot` path in that vhost file.
- MariaDB on this machine uses local socket auth for your macOS user.
