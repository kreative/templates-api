This is the main entity in the Kreative Templates API. Templates are the main resource that users will interact with. Templates are the building blocks of the Kreative Templates application.

### Template Object

| Field           | Type       | Description                                                                                                                            |
| --------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `id`            | `string`   | The unique identifier for the template.                                                                                                |
| `createdAt`     | `Datetime` | The date and time that the template was created.                                                                                       |
| `updatedAt`     | `Datetime` | The date and time that the template was last updated.                                                                                  |
| `name`          | `string`   | The name of the template.                                                                                                              |
| `description`   | `string`   | The description of the template.                                                                                                       |
| `tagline`       | `string`   | The tagline of the template.                                                                                                           |
| `application`   | `string`   | The application that can use this template. For the first few versions, this will default to 'obsidian'.                               |
| `thumbnailUrl`  | `string`   | The URL of the promo image for the template. This image will be shown when rendering a list of templates.                              |
| `galleryImages` | `array`    | List of URLs for the gallery images for the template. These images will be shown when viewing the template in it's own dedicated page. |
| `price`         | `number`   | The price of the template. For the first few versions, this will default to 0.                                                         |
| `author`        | `string`   | Author.id for the author of the template.                                                                                              |
| `plugins`       | `array`    | List of Plugin.id's for the plugins that the template uses.                                                                            |
| `categories`    | `array`    | List of Category.id's for the categories that the template belongs to.                                                                 |
| `fileUrl`       | `string`   | The URL of the template file. This is the file that will be downloaded when a user purchases the template.                             |
| `downloadUrl`   | `string`   | The Kreative Hyperlink that routes to the `fileUrl`. This is the URL that will be sent in the email users recieve.                     |
