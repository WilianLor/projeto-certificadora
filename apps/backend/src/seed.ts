import Product from "./schemas/product.schema";
import User from "./schemas/user.schema";

export const seedDatabase = async () => {
    const admin = await User.findOne({ username: "admin", admin: true });
    const user = await User.findOne({ username: "user", admin: false });
    const product = await Product.findOne({ name: "Absorvente" });

    if (!admin)
        await User.create({ username: "admin", admin: true, password: "admin" });

    if (!user)
        await User.create({ username: "user", admin: false, password: "user" });

    if (!product) await Product.create({ name: "Absorvente", amount: 0 });
};