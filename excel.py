import pymongo
import pandas as pd

# MongoDB connection settings
MONGO_URI = "mongodb+srv://backend:backend@cluster0.f8qb5sr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DB_NAME = "test"
COLLECTION_NAME = "users"

# Connect to MongoDB
client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# Create a function to update Excel or CSV
def update_excel():
    # Query MongoDB collection to get data
    cursor = collection.find({})
    data = list(cursor)

    # Convert MongoDB data to DataFrame
    df = pd.DataFrame(data)

    # Write DataFrame to Excel or CSV
    df.to_excel("data.xlsx", index=False)
    # df.to_csv("data.csv", index=False)

# Create a change stream
with collection.watch(full_document='updateLookup') as stream:
    for change in stream:
        # Print the change event
        print(change)

        # Update Excel or CSV
        update_excel()
