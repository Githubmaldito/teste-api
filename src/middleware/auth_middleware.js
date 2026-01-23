
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//middleware para proteger rotasb
// const protectRoute = async (req, res, next) => {
//     try {
//         //pega o token do header da requisição
//         // modificando pra ver se resolveo errro
//         const token = req.header("Authorization").replace("Bearer", "");
//         if(!token){
//             return res.status(401).json({ message: "Acesso negadgo. Token não fornecido." });
//         }

//         //verifica o token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         //busca o usuário no banco de dados
//         const user = await User.findById(decoded.id).select("-password");
//         if(!user){
//             return res.status(401).json({ message: "Acesso negado. Usuário não encontrado." });
//         }

//         req.user = user;
//         next(); 
//     } catch (error) {
//        res.status(401).json({ message: "Deus lhe abandonou." });
//     }
// }

// export default protectRoute;



const protectRoute = async (req, res, next) => {
  try {
    // get token
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No authentication token, access denied" });

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "Token is not valid" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protectRoute;
