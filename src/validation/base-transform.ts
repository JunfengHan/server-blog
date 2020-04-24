export const TransStr2Number = v => {
	if (Array.isArray(v)) {
		return v.map(Number);
	} else {
		return +v;
	}
};

export const TransAny2Str = v => {
	if (Array.isArray(v)) {
		return v.map(x => String(x).trim());
	} else {
		return String(v).trim();
	}
};

export const TransAny2Bool = v => {
	if (Array.isArray(v)) {
		return v.map(x => Boolean(x));
	} else {
		return !!v;
	}
};

export const TransSplitArr = v => {
	if (typeof v === 'string') {
		return v.split(',');
	}

	return v;
};
