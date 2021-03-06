const UserModel = require('../model/User-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
	async registration(email, password) {
		const candidate = await UserModel.findOne({email});
		if (candidate) {
			throw ApiError.BadRequest('A user with this email has already been created');
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink =  uuid.v4(); // random 
		
		const user = await UserModel.create({email, password: hashPassword, activationLink});
		await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);
		
		const userDto = new UserDto(user); // id, email, isActivated
		const tokens = tokenService.genetateTokens({...userDto});
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {...tokens, user: userDto}
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({activationLink});
		if(!user) {
			throw ApiError.BadRequest('Link is not correct');
		}
		user.isActivated = true;
		await user.save();
	}

	async login(email, password) {
		const user = await UserModel.findOne({email});
		if (!user) {
			throw ApiError.BadRequest('User with this email is not to find');
		}
		const isPassEquals = await bcrypt.compare(password, user.password);
		if (!isPassEquals) {
			throw ApiError.BadRequest('Password is not correct');
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.genetateTokens({...userDto});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {...tokens, user: userDto}
	}

	async logout (refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh (refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if(!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}
		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.genetateTokens({...userDto});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {...tokens, user: userDto}
	}

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}
}

module.exports = new UserService();