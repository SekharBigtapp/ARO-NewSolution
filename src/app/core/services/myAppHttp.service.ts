export default class MyAppHttp {
  public static ToastType = {
    ERROR: 'error',
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
  };

  public static ToasterMessage = {
    // tableName: "Make sure table name is valid",
    // tableName :"Data uploading template table name is not matching with selected table name. Please select correct data upload template",
    tableName1 :"Data uploading template table name ", 
    tableName2 : " is not matching with selected table name ",
    tableName3 : ". Please select correct data upload template",
    // excelColumns: "Make sure columns are valid",
    excelColumns: "Invalid data columns.Make sure data columns details present in Row-4 in data uploading template.",
    // excelData: "Make sure data is valid",
    excelData: "Template column data type is not matching with table column data. Please make sure column data is valid." ,
    templateSuccess: "Saved Successfully",
    actionInvalid1: "Invalid ACTION",
    actionInvalid2:"This record cannot be processed.",
    // mandatory:"Make sure mandatory columns are valid",
    mandatory1:"Data is empty.",
    mandatory2:" data is mandatory.Please provide data.",
    fieldLength1:" data length more than defined length ",
    fieldLength2:".Please provide valid data.",
    // alphanumeric:"Make sure columns with alpha numeric is valid",
    dataType1:"Invalid column data type. ",
    dataType2:" data type is ",
    dataType3:".Please provide valid data type data.",
    number:"Make sure columns with numeric is valid",
    // templateValidation:"Please configure Template Details",
    templateValidation:"Data field mapping is missing. Please complete the mapping using table configurator." ,
    // onlyExcel:"Invalid file type. Pls. upload files with XLS/XLSX",
    onlyExcel:"Invalid file type. Please upload files with XLS/XLSX type only.",
    userSaved:"User details are updated successfully.",//"Saved User Successfully",
    noData:"No data found",
    activeOrNot: "User's role is Inactive. Contact Application Admin", //"User role is Inactive. Please contact Application Admin.",
    deleteAction: "Record does not exists. This record cannot be processed.",
    duplicateEntry: "Record already exist. This record cannot be processed.",//"Duplicate entry. Primary key already exists",
    invalidActionCol: " is a invalid action. Can not process this record.",
    columnsCount: "Template columns count does not match with table columns count.",
    RecorddoesexistsPK:"Record does not exists",
    // UpdateAction: "Record does not exists for Updation",
    UpdateAction: "Record does not exist. This record can not be processed.",
    Unauthorizedaction:"Invalid Action. User do not have  permission to delete records.",
    // Unauthorizedaction1:  "User do not have Permission to delete records.",
    deleteRecord: "Record is already deleted. This record can not be processed.",
    uploadSuccess:"Loading Completed."
  }

  public static notificationTimeOut = 60000; //15 seconds

  public static idleTimeOut = 3600; //30 mins

  public static passwordValidation=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/
}