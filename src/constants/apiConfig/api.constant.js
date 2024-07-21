export const API_ROUTES = {
  admin: {
    login: 'admin/login',
    agencies: 'admin/agency',
    users: 'admin/users',
  },
  auth: {
    login: 'auth/login',
    register: 'auth/register',
  },
  userGroup: 'usergroup',
  user: 'user',
  airline: {
    airline: 'airline',
    getAirlineByTicketId: 'airline/getAirlinesByTicketNo',
    airlineOptions: 'airline/options',
    deleteManyAirline: 'airline/deleteMany',
    addAirline: 'airline',
    getAirline: 'airline',
  },
  customer: {
    customer: 'customer',
    deleteMany: '/customer/deleteMany',
  },

  booking: 'ticketBooking',
  airport: 'airport',
  deleteManyBooking: 'ticketBooking/deleteMany',

  bank: {
    bank: 'bank',
    deleteManyBank: 'bank/deleteMany',
    queryByField: 'bank/queryByField',
  },
  package: 'package',
  generalVendor: {
    generalVendor: 'generalVendor',
    deleteManyGeneralVendor: 'generalVendor/deleteMany',
  },
  finance: {
    addTransaction: 'finance/balanceManagement',
    transactions: 'finance',
    generalExpenses: 'finance/balanceManagementForGeneralExpenses',
    transfer: 'finance/transfer',
  },
  notification: {
    getNotifications: 'notification',
  },
  deleteNotification: 'notification',
  deleteManyNotification: 'notification/deleteMany',
  updateManyNotification: 'notification/markAsReadAll',
  visaAgent: {
    visaAgent: 'visa_agent',
    deleteManyVisaAgent: 'visa_agent/deleteMany',
  },
  expenseAccount: {
    expenseAccount: 'expenseAccount',
    deleteManyExpenseAccount: 'expenseAccount/deleteMany',
  },
  task: {
    tasks: 'task',
    queryByField: 'task/queryByField',
  },
};

export const BASE_URL = process.env.REACT_APP_API_KEY ;

// API.POST(API_ROUTES.finance.balanceManagement);
