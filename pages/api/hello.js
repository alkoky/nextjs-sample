// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    
    if (req.method === 'POST') {
      // Process a POST request
      logger.log(req);
     
    } else {
      res.status(200).json({ name: 'Hello Naim' })
    }
  }
}
