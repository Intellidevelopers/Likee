export const convertDobToAge = (dob) => {
	const birthDate = new Date(dob);
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();

	// Adjust age if the birth month hasn't occurred yet this year or if it's the current month but the birth date hasn't passed.
	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}
	return age + 1;
};

// const dob = '2025-01-02T02:51:03.667Z';
// console.log(convertDobToAge(dob)); // Output: Age

export const checkIsUser = (userId, otherUserId) => {
	if (userId.toString() === otherUserId.toString()) return true;
	return false;
};
