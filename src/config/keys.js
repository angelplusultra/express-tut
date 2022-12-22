export default function keysCongig(){
    if(process.env.NODE_ENV === 'development'){
        const keys = {
            google: {
                CLIENT_ID:'305063020403-3f0m0l7lkd0d5ehpnafhreb24f1g9352.apps.googleusercontent.com',
                CLIENT_SECRET:'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'

            },
            mongo: {
                MONGO_URI: 'mongodb+srv://macfitton:ilovemoms@cluster0.mbppycz.mongodb.net/?retryWrites=true&w=majority'

            },
            session: {
                SESSION_SECRET: 'billclinton'
            },
            jwt: {
                JWT_SECRET: 'omgsosecretshhh'
            }
        }

        return keys
        
    } else if(process.env.NODE_ENV === 'production'){
        const keys = {
            google: {
                CLIENT_ID: process.env.CLIENT_ID,
                CLIENT_SECRET: process.env.CLIENT_SECRET

            },
            mongo: {
                MONGO_URI: process.env.MONGO_URI

            },
            session: {
                SESSION_SECRET: process.env.SESSION_SECRET
            },
            jwt: {
                JWT_SECRET: process.env.JWT_SECRET
            }
        }

        return keys
    }
}