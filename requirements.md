The mammoth-cetv-portal is a self-service for CETV Ad Supported Digital Signage.

The portal lets users:

1. Sign up
2. Setup their location and screens
3. Order CETV Signage Devices
4. Manage their content library
5. Select the licensed content channels they would like to use
6. Create playlists for their screens - playlists can be user uploaded content and licensed content from channels
7. Manage their screen layout - there are two versions of the layout availabe, one with just content and another with five zones that are configurable

Stack
The portal will be built using:

1. Next.js
2. Shadcn
3. Clerk for auth
4. MongoDB for the database

UI Scaffold
The UI will scaffolded using Shadcn preset b0 - npx shadcn@latest init --preset b0 --template next

The UI should match the UI in the mammoth-ad-ops-platform project (../mammoth-ad-ops-platform).

UX
A user should be able to create an account with an email only. Once the email address is confirmed via Clerk, the user will be walked through a wizard/on-boarding flow to setup their first location and screen(s).

The onboarding flow will be:

1. Add your location details
   - Location Name
   - Address (use a location API for type ahead)
2. Select Ad Serving Mode
   - Ad Free ($5/month per screen) - licensed content not available, subscription will be completed when device arrives and is installed
   - Ad Supported - ads will be requested every X seconds and played when available
3. If the user selects Ad Supported then they can select the Licensed Content Channels they are interested in
   - Sports
   - News
   - Fail Reels
4. Order Your Device
   - Shipping Address (this should be prefilled with their location address)
   - Credit Card Information

Steps 2 and 3 should be skippable. Step four can not be skipped, if they do not complete step four they can not proceed to the dashboard. If they leave the app and come back then they should be taken directly to step 4.

Credit Card Processing
Stripe will be used for CC processing

Auth/User Management
Auth and user management will be done using Clerk. When a user signs up they should be sent an email confirmation. Once the email is confirmed Clerk a webhook will be fired to setup the user's Account (accounts collection in MongoDB) and the user's User (users collection in MongoDB)

Data Models
These collections already exist in the database, with the exception of device_orders and playlists, and have a defined schema.

Users (partial model)
account_id: Objectid
clerk_user_id: String
first_name: String
last_name: String
status: String
created_at: Date
updated_at: Date

Accounts (partial model)
name: String
stripeCustomerId: String
onboardingStep: Int
onboardingComplete: Bool

Location (partial model)
account_id: ObjectId
name: String
address: String
city: String
state: String
zip: String
lat: Float
long: Float
geo_point: Object (MongoDB GeoJSON object)

Screens (partial model)
account_id: ObjectId
location_id: ObjectId
screen_name: String
location_name: String
partner: String (CETV by default)
state: String
status: String ("new" by default)
play_count: Int (0 by default)
screen_size: String (null by default)
network_id: ObjectId (null by default)
utc_offset: Int
connected: Bool (false by default)
ad_serving_mode: String
layout_id: ObjectId (null by default)
playlist_id: ObjectId (null by default)
ext_channels: Array

Content (partial model)
account_id: ObjectId
type: String
status: String
url: String
mime_type: String
partner: String (CETV by default)
total_plays: Int (0 by default)

Playlists
account_id: ObjectId
name: String
status: String
conent: Array of playlist content objects
channels: Array of channel objects
created_at: Date
updated_at: Date

Device_Orders
account_id: ObjectId
user_id: ObjectId
screen_id: ObjectId
location_id: ObjectId
shippingAddres: Object
stringCustomerId: String
stripeSetupIntent: String
status: String

Playlist Content Object
{
type: "content | channel",
id: object ID of the content or the channel
name: name of the content piece of channel
}
