declare namespace mdBusinessLogic {
    module settings {
        var debug: boolean;
        var code: string;
        var lcid: number;
        var apiBase: string;
        var apiBaseSeparator: string;
        var appBase: string;
        var uploadsBase: string;
        var apiAllowCrossOrigin: boolean;
        var isAdministration: boolean;
        var packageWebSocketInBody: boolean;
        var authorizationHeader: string;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.base {
    interface IBaseEntity<E> {
        construct(data: any): void;
        clone(): E;
    }
}
declare namespace mdBusinessLogic.helpers {
    class entityHelper {
        static parseDateAndTimezoneToString(date?: any, timezone?: string, delimiter?: string): string;
        static parseDateStringValue(data: any, defaultValue?: Date, delimiter?: string): string;
        static parseDateValue(data: any, defaultValue?: Date, delimiter?: string): Date;
        static parseTimeZoneValue(data: any, defaultValue?: string, delimiter?: string): string;
        static getDateValue(data: any, fieldName: string, defaultValue: Date, delimiter?: string): Date;
        static getTimeZoneValue(data: any, fieldName: string, defaultValue: string, delimiter?: string): string;
        static getValue<T>(data: any, fieldName: string, defaultValue: T): T;
        static getConstructEntityValue<T extends dataAccess.entities.base.IBaseEntity<T> & dataAccess.entities.base.BaseEntity>(data: any, fieldName: string, defaultValue: T, returnNullIfInvalid?: boolean): T;
        static getConstructValue<T extends dataAccess.entities.base.IBaseEntity<T>>(data: any, fieldName: string, defaultValue: T): T;
        static getArrayConstructEntityValue<T extends dataAccess.entities.base.IBaseEntity<T> & dataAccess.entities.base.BaseEntity>(data: any, fieldName: string, defaultValue: Array<T>, defaultTypeValue: T, returnNullIfInvalid?: boolean): Array<T>;
        static getArrayConstructValue<T extends dataAccess.entities.base.IBaseEntity<T>>(data: any, fieldName: string, defaultValue: Array<T>, defaultTypeValue: T): Array<T>;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.base {
    abstract class BaseEntity {
        Id: any;
        IsDeleted: boolean;
        constructor(obj?: BaseEntity);
        static getDateValue(data: any, fieldName: string, defaultValue: Date): Date;
        getDateValue(data: any, fieldName: string, defaultValue: Date): Date;
        static getTimeZoneValue(data: any, fieldName: string, defaultValue: string): string;
        getTimeZoneValue(data: any, fieldName: string, defaultValue: string): string;
        static getValue<T>(data: any, fieldName: string, defaultValue: T): T;
        getValue<T>(data: any, fieldName: string, defaultValue: T): T;
        static getConstructValue<T extends IBaseEntity<T>>(data: any, fieldName: string, defaultValue: T): T;
        getConstructValue<T extends IBaseEntity<T>>(data: any, fieldName: string, defaultValue: T): T;
        static getConstructEntityValue<T extends IBaseEntity<T> & BaseEntity>(data: any, fieldName: string, defaultValue: T, returnNullIfInvalid?: boolean): T;
        getConstructEntityValue<T extends IBaseEntity<T> & BaseEntity>(data: any, fieldName: string, defaultValue: T, returnNullIfInvalid?: boolean): T;
        static getArrayConstructValue<T extends IBaseEntity<T>>(data: any, fieldName: string, defaultValue: Array<T>, defaultTypeValue: T): Array<T>;
        getArrayConstructValue<T extends IBaseEntity<T>>(data: any, fieldName: string, defaultValue: Array<T>, defaultTypeValue: T): Array<T>;
        static getArrayConstructEntityValue<T extends IBaseEntity<T> & BaseEntity>(data: any, fieldName: string, defaultValue: Array<T>, defaultTypeValue: T, returnNullIfInvalid?: boolean): Array<T>;
        getArrayConstructEntityValue<T extends IBaseEntity<T> & BaseEntity>(data: any, fieldName: string, defaultValue: Array<T>, defaultTypeValue: T, returnNullIfInvalid?: boolean): Array<T>;
        construct(data: any): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class user extends base.BaseEntity implements base.IBaseEntity<user> {
        Username: string;
        Password: string;
        ProfileTypes: Array<any>;
        ProfileTypeId: number;
        OldPassword: string;
        Token: string;
        DateRefreshToken: Date;
        RWDPermissions: Array<any>;
        AdministrationAllowed: boolean;
        IsRoot: boolean;
        constructor(obj?: user);
        construct(data: any): void;
        clone(): user;
    }
}
declare namespace mdBusinessLogic {
    namespace dataAccess {
        namespace entities {
            class loggedOnUser extends user {
                SessionId: string;
                constructor(obj?: loggedOnUser);
                construct(data: any): void;
                clone(): loggedOnUser;
                toString(): string;
            }
        }
    }
}
declare namespace mdBusinessLogic {
    namespace globals {
        var loggedOnUser: dataAccess.entities.loggedOnUser;
        var loggedOnUserToken: string;
        var selectedLanguage: string;
        var systemName: string;
        var systemVersion: string;
        var numberAwsSocketRetries: number;
    }
}
declare namespace mdBusinessLogic.helpers.encoder.base64 {
    var encode: (input: string) => string;
    var decode: (input: string) => string;
}
declare namespace mdBusinessLogic.helpers {
    var oopHelper: (child: any, parent: any) => void;
    function loadParentArray(obj: any, parentName: string, parentLinkName: string, parentArray?: Array<any>): Array<any>;
}
declare namespace mdBusinessLogic {
    namespace dataAccess {
    }
}
declare var forge: any;
declare var angular: any;
declare namespace mdBusinessLogic {
}
declare namespace mdBusinessLogic.dataAccess.controllers.base {
    abstract class BaseController_helpers {
        protected loadParentNamesAsArray(nameArray: Array<any>, obj: any, parentName: string, parentLinkName: string): void;
        protected parseUrl(url: string): HTMLAnchorElement;
        getAddress(endpoint: string, data?: any): string;
    }
}
declare namespace mdBusinessLogic {
    namespace helpers {
        class mdException {
            settings: any;
            message: string;
            errorData: any;
            innerException: any;
            stackTrace: any;
            constructor(message: string, errorData?: any, innerException?: any, stackTrace?: any);
        }
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers.base {
    class AjaxMethodData<C, E extends entities.base.IBaseEntity<E>> {
        responseData: E;
        responseDataArray: Array<E>;
        requestData: any;
        controller: C;
        exception: helpers.mdException;
        protected requestId: string;
        private requestIdAutoGenerated;
        constructor(requestId?: string);
        getRequestId(): string;
        getRequestIdAutoGenerated(): boolean;
    }
    class AjaxMethodDataSocket<C, E extends entities.base.IBaseEntity<E>> extends AjaxMethodData<C, E> {
        socket: WebSocket;
        constructor(requestId?: string);
    }
    class AjaxMethodOptions<C, E extends entities.base.IBaseEntity<E>> extends AjaxMethodData<C, E> {
        includeAuthHeader: boolean;
        isJsonArray: boolean;
        isAdministration: boolean;
        isFormData: boolean;
        contentType: AjaxMethodHeader;
        dataType: string;
        showLoading: boolean;
        address: string;
        clearCache: boolean;
        method: AjaxMethodType;
        headers: Array<AjaxMethodHeader>;
        lcid: number;
        onSuccess: (data: AjaxMethodData<C, E>) => void;
        onError: (data: AjaxMethodData<C, E>) => void;
        constructor(requestId?: string);
        getFullUrl(prefix?: string): string;
        private getAddressWithCacheFlag;
        getPartialUrl(prefix?: string): string;
        getMethodTypeString(): string;
        private _onsuccess;
        private _onerror;
        getRequestId(): string;
    }
    enum AjaxMethodType {
        GET = 1,
        POST = 2,
        PUT = 3,
        DELETE = 4,
        SOCKET = 5
    }
    class AjaxMethodHeader {
        name: string;
        value: string;
        constructor(name: string, value: string);
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.exceptions {
    class netException implements base.IBaseEntity<netException> {
        StackTrace: string;
        Source: string;
        Message: string;
        InnerException: netException;
        HResult: number;
        Data: any;
        constructor(obj?: netException);
        construct(data: any): void;
        clone(): netException;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.exceptions {
    class errorDetails implements base.IBaseEntity<errorDetails> {
        StatusCode: number;
        Message: string;
        InnerException: netException;
        constructor(obj?: errorDetails);
        construct(data: any): void;
        clone(): errorDetails;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class attributeTypeDefinition extends base.BaseEntity implements base.IBaseEntity<attributeTypeDefinition> {
        Name: string;
        DefaultValue: string;
        Type: number;
        InputType: number;
        constructor(obj?: attributeTypeDefinition);
        construct(data: any): void;
        clone(): attributeTypeDefinition;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.genericContent {
    abstract class baseField extends base.BaseEntity {
        AttributeTypeDefinitionId: number;
        Name: string;
        DefaultValue: string;
        AttributeTypeDefinition: attributeTypeDefinition;
        Delimiter: string;
        ListValue: string;
        FriendlyName: string;
        IsRequired: boolean;
        UniqueId: string;
        IsReadOnly: boolean;
        constructor(obj?: baseField);
        construct(data: any): void;
        getListValueAsArray(): Array<string>;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.genericContent {
    abstract class genericContentField extends baseField {
        Description: string;
        SafeName: string;
        Order: number;
        Options: string;
        JsonField: genericContentFieldJsonField;
        OptionsJson: any;
        DataBound: boolean;
        DataSourceId: number;
        DataSourceField: string;
        DataBoundReadOnly: boolean;
        IsDataBoundPrimaryKey: boolean;
        constructor(obj?: genericContentField);
        construct(data: any): void;
        setOptions(optionsJson: any): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.genericContent {
    abstract class genericContentFieldValue extends genericContentField {
        Value: string;
        constructor(obj?: genericContentFieldValue);
        construct(data: any): void;
    }
}
declare namespace mdBusinessLogic {
    namespace dataAccess {
        namespace entities {
            class metaDataField extends entities.genericContent.genericContentField implements base.IBaseEntity<metaDataField> {
                constructor(obj?: metaDataField);
                construct(data: any): void;
                clone(): metaDataField;
            }
        }
    }
}
declare namespace mdBusinessLogic {
    namespace dataAccess {
        namespace entities {
            class metaDataFieldValue extends entities.genericContent.genericContentFieldValue implements base.IBaseEntity<metaDataFieldValue> {
                ContentId: number;
                LCID: number;
                DateCreated: Date;
                MetaDataFieldId: number;
                constructor(obj?: metaDataFieldValue);
                construct(data: any): void;
                clone(): metaDataFieldValue;
            }
        }
    }
}
declare namespace mdBusinessLogic {
    namespace dataAccess {
        namespace entities {
            class template extends base.BaseEntity implements base.IBaseEntity<template> {
                Name: string;
                Description: string;
                TemplateUrl: string;
                constructor(obj?: template);
                construct(data: any): void;
                clone(): template;
            }
        }
    }
}
declare namespace mdBusinessLogic {
    namespace dataAccess {
        namespace entities {
            class taxonomyContent extends base.BaseEntity implements base.IBaseEntity<taxonomyContent> {
                LCID: number;
                DateCreated: Date;
                TaxonomyId: number;
                Title: string;
                Type: string;
                Path: string;
                constructor(obj?: taxonomyContent);
                construct(data: any): void;
                clone(): taxonomyContent;
            }
        }
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class taxonomy extends base.BaseEntity implements base.IBaseEntity<taxonomy> {
        ParentId: number;
        Name: string;
        Description: string;
        Parent: taxonomy;
        Children: Array<taxonomy>;
        Items: Array<taxonomyContent>;
        FreeTextField: string;
        Lcid: number;
        FolderId: number;
        TaxonomyPath: string;
        Contents: Array<content>;
        ParentArray: Array<taxonomy>;
        ChildrenTotalCount: number;
        ItemsTotalCount: number;
        Order: number;
        constructor(obj?: taxonomy);
        construct(data: any): void;
        clone(): taxonomy;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class contentAlias extends base.BaseEntity implements base.IBaseEntity<contentAlias> {
        LCID: number;
        DateCreated: Date;
        ContentId: number;
        Alias: string;
        constructor(obj?: contentAlias);
        construct(data: any): void;
        clone(): contentAlias;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class contentTypeDefinition<T extends genericContent.genericContentField & base.IBaseEntity<T>> extends base.BaseEntity implements base.IBaseEntity<contentTypeDefinition<T>> {
        Name: string;
        Description: string;
        Fields: Array<T>;
        Options: string;
        JsonOptions: any;
        IsEditable: boolean;
        Icon: string;
        DataSources: Array<contentTypeDataSource>;
        Joins: Array<contentTypeDataSourceJoin>;
        private Instance;
        constructor(instance?: T, obj?: contentTypeDefinition<T>);
        construct(data: any): void;
        clone(): contentTypeDefinition<T>;
        convertToFieldValue(): this;
        setFieldValue(value: string, fieldName: string): void;
        getFieldValue(fieldName: string): string;
        getField(fieldName: string): T;
        hasLinkToTitle(): boolean;
        getLinkToTitle(): T;
        setJsonOptions(jsonOptions: any): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class contentTypeDefinitionFieldValue extends entities.genericContent.genericContentFieldValue implements base.IBaseEntity<contentTypeDefinitionFieldValue> {
        ContentId: string;
        LCID: number;
        DateCreated: Date;
        ContentTypeDefinitionFieldId: number;
        ContentTypeDefinitionId: number;
        constructor(obj?: contentTypeDefinitionFieldValue);
        construct(data: any): void;
        clone(): contentTypeDefinitionFieldValue;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class content extends base.BaseEntity implements base.IBaseEntity<content> {
        LCID: number;
        DateCreated: Date;
        AuthorId: number;
        FolderId: number;
        Title: string;
        Path: string;
        Html: string;
        Author: user;
        ContentType: contentTypeDefinition<contentTypeDefinitionFieldValue>;
        Taxonomy: Array<taxonomy>;
        MetaDataFieldValues: Array<metaDataFieldValue>;
        ContentAliases: Array<contentAlias>;
        Template: template;
        IsNew: boolean;
        IsPublished: boolean;
        IsDataBound: boolean;
        UniqueId: string;
        ContentTypeDefinitionId: number;
        constructor(obj?: content);
        construct(data: any): void;
        clone(): content;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class mediaContentMetaDataFeldValues extends metaDataField implements base.IBaseEntity<mediaContentMetaDataFeldValues> {
        MediaContentId: number;
        DateCreated: Date;
        Value: string;
        MetaDataFieldId: number;
        constructor(obj?: mediaContentMetaDataFeldValues);
        construct(data: any): void;
        clone(): mediaContentMetaDataFeldValues;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class mediaContent extends base.BaseEntity implements base.IBaseEntity<mediaContent> {
        Id: number;
        LCID: number;
        Size: string;
        Path: string;
        FileType: number;
        FolderId: number;
        Name: string;
        Description: string;
        Type: any;
        InputType: mediaContentInputType;
        MediaContentMetaDataFieldValues: Array<mediaContentMetaDataFeldValues>;
        PreviewUrl: string;
        FullNameFile: string;
        Icon: string;
        DateCreated: Date;
        UniqueId: string;
        constructor(obj?: mediaContent);
        construct(data: any): void;
        clone(): mediaContent;
    }
    enum mediaContentInputType {
        jpg = 1,
        txt = 2,
        mp4 = 3,
        JPG = 4,
        png = 5,
        PNG = 6,
        flv = 7,
        mkv = 8,
        jpeg = 9,
        JPEG = 10,
        pdf = 11,
        docx = 12,
        xls = 13,
        xlsx = 14
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    abstract class editable implements base.IBaseEntity<editable> {
        Edit: boolean;
        constructor(edit: boolean);
        construct(data: any): void;
        clone(): editable;
    }
    class length extends editable implements base.IBaseEntity<length> {
        Length: number;
        constructor(obj?: length);
        construct(data: any): void;
        clone(): length;
    }
    class casing extends editable implements base.IBaseEntity<casing> {
        UpperCase: boolean;
        LowerCase: boolean;
        constructor(obj?: casing);
        construct(data: any): void;
        clone(): casing;
    }
    class specialCharacters extends editable implements base.IBaseEntity<specialCharacters> {
        Included: Array<string>;
        constructor(obj?: specialCharacters);
        construct(data: any): void;
        clone(): specialCharacters;
    }
    class numbers extends editable implements base.IBaseEntity<numbers> {
        From: number;
        To: number;
        constructor(obj?: numbers);
        construct(data: any): void;
        clone(): numbers;
    }
    class characterTypes extends editable implements base.IBaseEntity<characterTypes> {
        Letters: boolean;
        Casing: casing;
        SpecialCharacters: specialCharacters;
        Numbers: numbers;
        constructor(obj?: characterTypes);
        construct(data: any): void;
        clone(): characterTypes;
    }
    class email extends editable implements base.IBaseEntity<email> {
        Domain: string;
        Extension: string;
        constructor(obj?: email);
        construct(data: any): void;
        clone(): email;
    }
    class webAddress extends editable implements base.IBaseEntity<webAddress> {
        Includes: Array<string>;
        Protocols: Array<string>;
        constructor(obj?: webAddress);
        construct(data: any): void;
        clone(): webAddress;
    }
    class typeValidation extends editable implements base.IBaseEntity<typeValidation> {
        Email: email;
        WebAddress: webAddress;
        constructor(obj?: typeValidation);
        construct(data: any): void;
        clone(): typeValidation;
    }
    class fieldValidation implements base.IBaseEntity<fieldValidation> {
        MinLength: length;
        MaxLength: length;
        CharacterTypes: characterTypes;
        TypeValidation: typeValidation;
        Regex: string;
        Required: boolean;
        Repeatable: boolean;
        constructor(obj?: fieldValidation);
        construct(data: any): void;
        clone(): fieldValidation;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class profileTypeFieldJsonField implements base.IBaseEntity<profileTypeFieldJsonField> {
        validation: fieldValidation;
        helpText: string;
        access: string;
        cssClass: string;
        toggle: string;
        hidden: boolean;
        enabled: boolean;
        constructor(obj?: profileTypeFieldJsonField);
        construct(data: any): void;
        clone(): profileTypeFieldJsonField;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class profileTypeField extends entities.genericContent.genericContentField implements base.IBaseEntity<profileTypeField> {
        ProfileTypeId: number;
        constructor(obj?: profileTypeField);
        construct(data: any): void;
        clone(): profileTypeField;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class profileTypeFieldValue extends entities.genericContent.genericContentFieldValue implements base.IBaseEntity<profileTypeFieldValue> {
        ProfileTypeFieldId: number;
        ProfileTypeId: number;
        UserId: number;
        constructor(obj?: profileTypeFieldValue);
        construct(data: any): void;
        clone(): profileTypeFieldValue;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class rwdPermission extends base.BaseEntity implements base.IBaseEntity<rwdPermission> {
        Read: boolean;
        Write: boolean;
        Delete: boolean;
        Target: rwdPermissionTargetEnum;
        TargetPrimaryKey: string;
        constructor(obj?: rwdPermission);
        construct(data: any): void;
        clone(): rwdPermission;
    }
    enum rwdPermissionTargetEnum {
        None = 0,
        Folder = 1,
        Content = 2,
        MediaContent = 3
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class profileType extends base.BaseEntity implements base.IBaseEntity<profileType> {
        Name: string;
        Icon: string;
        Description: string;
        PermissionXmlText: string;
        Fields: Array<profileTypeFieldValue>;
        IsAssigned: boolean;
        RWDPermissions: Array<rwdPermission>;
        constructor(obj?: profileType);
        construct(data: any): void;
        clone(): profileType;
        setFieldValue(value: string, fieldName: string): void;
        getFieldValue(fieldName: string): string;
        getField(fieldName: string): profileTypeFieldValue;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class folderMetaDataField extends base.BaseEntity implements base.IBaseEntity<folderMetaDataField> {
        FolderId: number;
        MetaDataFieldId: number;
        IsRequired: boolean;
        Checked: boolean;
        Name: string;
        constructor(obj?: folderMetaDataField);
        construct(data: any): void;
        clone(): folderMetaDataField;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.aws.socket {
    class awsSocketModel implements base.IBaseEntity<awsSocketModel> {
        message: string;
        connectionId: string;
        requestId: string;
        constructor(obj?: awsSocketModel);
        construct(data: any): void;
        clone(): awsSocketModel;
    }
    enum executionScheduleType {
        Manual = 0,
        Recurring = 1
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers.base {
    abstract class BaseController<C, E extends entities.base.IBaseEntity<E>> extends BaseController_helpers {
        private controllerBase;
        constructor(controllerBase: string);
        getAddress(endpoint: string, data?: any, includeBase?: boolean): string;
        private generateNonSecureRequestSocket;
        private generateNonSecureRequestXhr;
        private generateNonSecureRequest;
        private setHeaders;
        private prepareFormData;
        private prepareSubFormItems;
        _get(options: AjaxMethodOptions<C, E>): void;
        _post(options: AjaxMethodOptions<C, E>): void;
        _put(options: AjaxMethodOptions<C, E>): void;
        _delete(options: AjaxMethodOptions<C, E>): void;
        _socket(options: AjaxMethodOptions<C, E>): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers.options {
    interface iContentRequestOptions {
        ContentIds?: Array<string>;
        LoadAuthor?: boolean;
        LoadFields?: boolean;
        LoadMetaData?: boolean;
        LCID?: number;
        FolderId?: number;
        OnlyPublished?: boolean;
        SearchTerm?: string;
        PageIndex?: number;
        PageSize?: number;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class contentController extends base.BaseController<contentController, entities.content | entities.primitiveType<any> | entities.paginationEntity<entities.content>> {
        constructor(controllerBase?: string);
        getById(id: string, loadAuthor: boolean, lcid: number, fillFields: boolean, isDataBound: boolean, contentTypeDefinitionId: number, onSuccess: (obj: entities.content) => void, onError: (error: helpers.mdException) => void): void;
        getByIds(ids: Array<string>, loadAuthor: boolean, lcid: number, fillFields: boolean, isDataBound: boolean, contentTypeDefinitionId: number, onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        getByRequest(request: options.iContentRequestOptions, onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        taxonomyContentGetContentByTaxonomy(id: number, onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        taxonomyContentGetContentByTaxonomyFullMeta(id: number, onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        menuContentGetContentByMenu(id: number, onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        translate(content: entities.content, targetLcid: number, lcid: number, onSuccess: (obj: entities.content) => void, onError: (error: helpers.mdException) => void): void;
        selectAllCount(id: number, onSuccess: (obj: entities.content) => void, onError: (error: helpers.mdException) => void): void;
        getByFolderId(id: number, loadAuthor: boolean, lcid: number, loadFields: boolean, loadMetaDataFields: boolean, onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetByFolderId(paginationData: options.iFolderPaginatedRequestOptions, onSuccess: (obj: entities.paginationEntity<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        getByFolderIdCount(countData: number, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        getAllVersion(id: number, onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        getByAll(obj: entities.content, onSuccess: (obj: entities.content) => void, onError: (error: helpers.mdException) => void): void;
        search(searchData: any, onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        getBySearchTerm(searchTerm: string, loadAuthor: boolean, lcid: number, onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        save(obj: entities.content, onSuccess: (obj: entities.content) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.content) => void, onError: (error: helpers.mdException) => void): void;
        deleteByAll(id: number, onSuccess: (obj: entities.content) => void, onError: (error: helpers.mdException) => void): void;
        selectByContentTypeDefinitionCount(id: number, onSuccess: (obj: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        doesContentExist(contents: Array<entities.content>, content: entities.content): number;
    }
}
declare namespace mdBusinessLogic {
    namespace dataAccess {
        namespace controllers {
        }
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    var isFunction: (functionToCheck: any) => boolean;
    var isArray: (obj: any) => boolean;
    var isObject: (obj: any) => boolean;
    enum entitiesEnum {
        Content = 1,
        AttributeTypeDefinition = 2,
        ContentTypeDefinition = 3,
        ContentTypeDefinitionField = 4,
        ContentTypeDefinitionFieldValue = 5,
        ContentTypeDefinitionFolder = 6,
        Folder = 7,
        FolderMediaContentMetaDataField = 8,
        FolderMetaDataField = 9,
        MediaContentMetaDataFieldValues = 10,
        MediaContent = 11,
        LCID = 12,
        Culture = 13,
        MenuContent = 14,
        ContentAlias = 15,
        Menu = 16,
        MetaDataField = 17,
        MetaDataFieldValue = 18,
        Permissions = 19,
        Profile = 20,
        ProfileType = 21,
        ProfileTypeField = 22,
        ProfileTypeFieldValue = 23,
        Session = 24,
        TaxonomyContent = 25,
        Taxonomy = 26,
        Template = 27,
        User = 28,
        RWDPermission = 29,
        Report = 30,
        ReportDefinition = 31,
        ReportData = 32,
        ReportScheduler = 33,
        ReportSchedulerAction = 34,
        ApprovalChain = 35,
        Step = 36,
        StepAction = 37,
        StepUser = 38,
        MessageFolder = 39,
        Message = 40,
        ApprovalChainApproval = 41,
        ContentTypeDefinitionDataSource = 42,
        ContentTypeDefinitionDataSourceJoin = 44,
        ContentTypeDefinitionFolderDataBoundCondition = 45,
        ContentTypeDefinitionFolderDataBoundSync = 46
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class approvalChain extends base.BaseEntity implements base.IBaseEntity<approvalChain> {
        FolderId: number;
        IsActive: boolean;
        Steps: any[];
        ChainId: number;
        constructor(obj?: approvalChain);
        construct(data: any): void;
        clone(): approvalChain;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class approvalChainStepAction extends base.BaseEntity implements base.IBaseEntity<approvalChainStepAction> {
        StepId: number;
        UserId: number;
        Action: number;
        Type: number;
        RedirectTo: number;
        constructor(obj?: approvalChainStepAction);
        construct(data: any): void;
        clone(): approvalChainStepAction;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class approvalChainStep extends base.BaseEntity implements base.IBaseEntity<approvalChainStep> {
        ApprovalChainId: number;
        ComboOperator: number;
        Order: number;
        UserIds: Array<primitiveType<number>>;
        Actions: Array<approvalChainStepAction>;
        constructor(obj?: approvalChainStep);
        construct(data: any): void;
        clone(): approvalChainStep;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class approvalChainApproval extends base.BaseEntity implements base.IBaseEntity<approvalChainApproval> {
        ApprovalType: number;
        ReviewDate: Date;
        Content: content;
        Comment: string;
        User: user;
        Step: approvalChainStep;
        constructor(obj?: approvalChainApproval);
        construct(data: any): void;
        clone(): approvalChainApproval;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class approvalChainController extends base.BaseController<approvalChainController, entities.approvalChain | entities.approvalChainStep | entities.approvalChainStepAction | entities.approvalChainApproval> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.approvalChain) => void, onError: (error: helpers.mdException) => void): void;
        getByFolderId(folderId: number, onSuccess: (obj: entities.approvalChain) => void, onError: (error: helpers.mdException) => void): void;
        save(approvalChain: entities.approvalChain, onSuccess: (obj: entities.approvalChain) => void, onError: (error: helpers.mdException) => void): void;
        'delete'(approvalChain: entities.approvalChain, onSuccess: (obj: entities.approvalChain) => void, onError: (error: helpers.mdException) => void): void;
        getStepById(id: number, onSuccess: (obj: entities.approvalChain) => void, onError: (error: helpers.mdException) => void): void;
        getStepsByApprovalChainId(id: number, onSuccess: (obj: entities.approvalChain) => void, onError: (error: helpers.mdException) => void): void;
        addStep(step: entities.approvalChainStep, onSuccess: (obj: entities.approvalChainStep) => void, onError: (error: helpers.mdException) => void): void;
        deleteStep(step: entities.approvalChainStep, onSuccess: (obj: entities.approvalChain) => void, onError: (error: helpers.mdException) => void): void;
        getStepActionById(id: number, onSuccess: (obj: entities.approvalChainStepAction) => void, onError: (error: helpers.mdException) => void): void;
        getStepActionsByStepId(id: number, onSuccess: (obj: entities.approvalChainStepAction) => void, onError: (error: helpers.mdException) => void): void;
        addStepAction(stepAction: entities.approvalChainStepAction, onSuccess: (obj: entities.approvalChainStepAction) => void, onError: (error: helpers.mdException) => void): void;
        deleteStepAction(stepAction: entities.approvalChainStepAction, onSuccess: (obj: entities.approvalChainStepAction) => void, onError: (error: helpers.mdException) => void): void;
        addApproval(approval: entities.approvalChainApproval, onSuccess: (obj: entities.approvalChainApproval) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class attributeTypeDefinitionController extends base.BaseController<attributeTypeDefinitionController, entities.attributeTypeDefinition> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.attributeTypeDefinition) => void, onError: (error: helpers.mdException) => void): void;
        getByInputTypeId(id: number, onSuccess: (obj: entities.attributeTypeDefinition) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.attributeTypeDefinition>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class omegaCachingObject implements base.IBaseEntity<omegaCachingObject> {
        ByteSize: number;
        CacheSource: string;
        CacheKey: string;
        Timeout: string;
        CacheTime: Date;
        CacheValue: string;
        constructor(obj?: omegaCachingObject);
        construct(data: any): void;
        clone(): omegaCachingObject;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class cacheResponse implements base.IBaseEntity<cacheResponse> {
        ProviderName: string;
        CacheObjects: Array<omegaCachingObject>;
        constructor(obj?: cacheResponse);
        construct(data: any): void;
        clone(): cacheResponse;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class cacheController extends base.BaseController<cacheController, entities.cacheResponse> {
        constructor();
        getAllDataCache(onSuccess: (obj: Array<entities.cacheResponse>) => void, onError: (error: helpers.mdException) => void): void;
        invalidateDataCache(provider: string, cacheKey: string, onSuccess: (obj: entities.cacheResponse) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class contentAliasController extends base.BaseController<contentAliasController, entities.contentAlias | entities.primitiveType<any>> {
        constructor();
        getById(id: number, lcid: number, onSuccess: (obj: entities.contentAlias) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.contentAlias>) => void, onError: (error: helpers.mdException) => void): void;
        getAllByContent(content: entities.content, onSuccess: (obj: Array<entities.primitiveType<string>>) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.contentAlias) => void, onError: (error: helpers.mdException) => void): void;
        save(contentAlias: entities.contentAlias, onSuccess: (obj: entities.contentAlias) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class contentTypeDefinitionField extends entities.genericContent.genericContentField implements base.IBaseEntity<contentTypeDefinitionField> {
        ContentTypeDefinitionId: number;
        constructor(obj?: contentTypeDefinitionField);
        construct(data: any): void;
        clone(): contentTypeDefinitionField;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class contentTypeDataSourceController extends base.BaseController<contentTypeDataSourceController, entities.contentTypeDataSource | entities.primitiveType<object>> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.contentTypeDataSource) => void, onError: (error: helpers.mdException) => void): void;
        getByContentTypeDefinitionId(id: number, onSuccess: (obj: Array<entities.contentTypeDataSource>) => void, onError: (error: helpers.mdException) => void): void;
        save(contentTypeDataSource: entities.contentTypeDataSource, onSuccess: (obj: entities.contentTypeDataSource) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.contentTypeDataSource) => void, onError: (error: helpers.mdException) => void): void;
        getDataStructure(contentTypeDataSource: entities.contentTypeDataSource, onSuccess: (obj: entities.primitiveType<object>) => void, onError: (error: helpers.mdException) => void): void;
        getAllDatabaseTypes(onSuccess: (obj: entities.primitiveType<object>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class contentTypeDataSourceJoinController extends base.BaseController<contentTypeDataSourceJoinController, entities.contentTypeDataSourceJoin> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.contentTypeDataSourceJoin) => void, onError: (error: helpers.mdException) => void): void;
        save(contentTypeDataSourceJoin: entities.contentTypeDataSourceJoin, onSuccess: (obj: entities.contentTypeDataSourceJoin) => void, onError: (error: helpers.mdException) => void): void;
        del(contentTypeDataSourceJoin: entities.contentTypeDataSourceJoin, onSuccess: (obj: entities.contentTypeDataSourceJoin) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class contentTypeDefinitionControllerGeneric<T extends entities.genericContent.genericContentField & entities.base.IBaseEntity<T>> extends base.BaseController<contentTypeDefinitionControllerGeneric<T>, entities.contentTypeDefinition<T> | entities.primitiveType<any> | entities.paginationEntity<entities.contentTypeDefinition<T>>> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.contentTypeDefinition<T>) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.contentTypeDefinition<T>>) => void, onError: (error: helpers.mdException) => void): void;
        getByFolder(folderId: number, onSuccess: (obj: Array<entities.contentTypeDefinition<T>>) => void, onError: (error: helpers.mdException) => void): void;
        contentTypeDefinitionsByFolder(folderId: number, onSuccess: (obj: Array<entities.contentTypeDefinition<T>>) => void, onError: (error: helpers.mdException) => void): void;
        save(contentTypeDefinition: entities.contentTypeDefinition<T>, onSuccess: (obj: entities.contentTypeDefinition<T>) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.contentTypeDefinition<T>) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetAll(data: any, onSuccess: (obj: entities.paginationEntity<entities.contentTypeDefinition<T>>) => void, onError: (error: helpers.mdException) => void): void;
        getAllCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
    }
    class contentTypeDefinitionController extends contentTypeDefinitionControllerGeneric<entities.contentTypeDefinitionField> {
    }
    class contentTypeDefinitionControllerValue extends contentTypeDefinitionControllerGeneric<entities.contentTypeDefinitionFieldValue> {
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class contentTypeDefinitionFieldController extends base.BaseController<contentTypeDefinitionFieldController, entities.contentTypeDefinitionField> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.contentTypeDefinitionField) => void, onError: (error: helpers.mdException) => void): void;
        getByContentTypeDefinition(id: number, onSuccess: (obj: Array<entities.contentTypeDefinitionField>) => void, onError: (error: helpers.mdException) => void): void;
        save(field: entities.contentTypeDefinitionField, onSuccess: (obj: entities.contentTypeDefinitionField) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.contentTypeDefinitionField) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class contentTypeDefinitionFieldValueController extends base.BaseController<contentTypeDefinitionFieldValueController, entities.contentTypeDefinitionFieldValue> {
        constructor();
        getByContent(id: number, onSuccess: (obj: Array<entities.contentTypeDefinitionFieldValue>) => void, onError: (error: helpers.mdException) => void): void;
        getByContentId(id: number, onSuccess: (obj: Array<entities.contentTypeDefinitionFieldValue>) => void, onError: (error: helpers.mdException) => void): void;
        getByValue(value: string, contentTypeDefinitionId: number, contentTypeDefinitionFieldId: number, comparer: helpers.data.comparerTypeEnum, transform: helpers.data.dataTransformEnum, onSuccess: (obj: Array<entities.contentTypeDefinitionFieldValue>) => void, onError: (error: helpers.mdException) => void): void;
        save(fieldValue: entities.contentTypeDefinitionFieldValue, onSuccess: (obj: entities.contentTypeDefinitionFieldValue) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class contentTypeDefinitionFolder extends base.BaseEntity implements base.IBaseEntity<contentTypeDefinitionFolder> {
        FolderId: number;
        ContentTypeDefinitionId: number;
        Title: string;
        constructor(obj?: contentTypeDefinitionFolder);
        construct(data: any): void;
        clone(): contentTypeDefinitionFolder;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class contentTypeDefinitionFolderController extends base.BaseController<contentTypeDefinitionFolderController, entities.contentTypeDefinitionFolder> {
        constructor();
        save(folder: entities.contentTypeDefinitionFolder, onSuccess: (obj: entities.contentTypeDefinitionFolder) => void, onError: (error: helpers.mdException) => void): void;
        del(folder: entities.contentTypeDefinitionFolder, onSuccess: (obj: entities.contentTypeDefinitionFolder) => void, onError: (error: helpers.mdException) => void): void;
        getByFolder(id: number, onSuccess: (obj: Array<entities.contentTypeDefinitionFolder>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class contentTypeDefinitionFolderDataBoundConditionController extends base.BaseController<contentTypeDefinitionFolderDataBoundConditionController, entities.contentTypeDefinitionFolderDataBoundCondition> {
        constructor();
        getByFolderAndContentTypeDefinitionId(folderId: number, contentTypeDefinitionId: number, onSuccess: (obj: Array<entities.contentTypeDefinitionFolderDataBoundCondition>) => void, onError: (error: helpers.mdException) => void): void;
        save(contentTypeDefinitionFolderDataBoundCondition: entities.contentTypeDefinitionFolderDataBoundCondition, onSuccess: (obj: entities.contentTypeDefinitionFolderDataBoundCondition) => void, onError: (error: helpers.mdException) => void): void;
        saveAll(contentTypeDefinitionFolderDataBoundConditions: Array<entities.contentTypeDefinitionFolderDataBoundCondition>, onSuccess: (obj: Array<entities.contentTypeDefinitionFolderDataBoundCondition>) => void, onError: (error: helpers.mdException) => void): void;
        del(obj: entities.contentTypeDefinitionFolderDataBoundCondition, onSuccess: () => void, onError: (error: helpers.mdException) => void): void;
        deleteAll(folderId: number, contentTypeDefinitionId: number, onSuccess: () => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class contentTypeDefinitionFolderDataBoundSyncController extends base.BaseController<contentTypeDefinitionFolderDataBoundSyncController, entities.contentTypeDefinitionFolderDataBoundSync> {
        constructor();
        getByFolderAndContentTypeDefinitionId(folderId: number, contentTypeDefinitionId: number, onSuccess: (obj: entities.contentTypeDefinitionFolderDataBoundSync) => void, onError: (error: helpers.mdException) => void): void;
        save(contentTypeDefinitionFolderDataBoundSync: entities.contentTypeDefinitionFolderDataBoundSync, onSuccess: (obj: entities.contentTypeDefinitionFolderDataBoundSync) => void, onError: (error: helpers.mdException) => void): void;
        del(obj: entities.contentTypeDefinitionFolderDataBoundSync, onSuccess: () => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class cultureController extends base.BaseController<cultureController, entities.culture> {
        constructor();
        selectCulture(onSuccess: (obj: entities.culture) => void, onError: (error: helpers.mdException) => void): void;
        getByLCID(id: number, onSuccess: (obj: entities.culture) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.culture>) => void, onError: (error: helpers.mdException) => void): void;
        getApproved(onSuccess: (obj: Array<entities.culture>) => void, onError: (error: helpers.mdException) => void): void;
        getAllForContentId(id: number, onSuccess: (obj: Array<entities.culture>) => void, onError: (error: helpers.mdException) => void): void;
        save(culture: entities.culture, onSuccess: (obj: entities.culture) => void, onError: (error: helpers.mdException) => void): void;
        del(culture: entities.culture, onSuccess: (obj: entities.culture) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    enum fileTypeEnum {
        image = 1,
        video = 2,
        audio = 3,
        application = 4,
        text = 5
    }
    class file extends base.BaseEntity implements base.IBaseEntity<file> {
        path: string;
        fileType: fileTypeEnum;
        data: any;
        constructor(obj?: file);
        construct(data: any): void;
        clone(): file;
        getFileType(): string;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class fileController extends base.BaseController<folderController, entities.primitiveType<any>> {
        constructor();
        upload(file: entities.file, onSuccess: (obj: any) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class folder<T extends base.BaseEntity & base.IBaseEntity<T>> extends base.BaseEntity implements base.IBaseEntity<folder<T>> {
        ParentId: number;
        Name: string;
        Description: string;
        Parent: folder<T>;
        Children: Array<folder<T>>;
        Contents: Array<content>;
        FolderPath: string;
        MetaDataFields: Array<folderMetaDataField>;
        MediaContent: Array<mediaContent>;
        ProfileTypePermissions: Array<profileType>;
        NotAuthorizedUsers: Array<user>;
        FolderMediaContentMetaDataField: Array<folderMediaContentMetaDataField>;
        ContentTypeDefinitionFolder: Array<contentTypeDefinitionFolder>;
        ContentTypeDefinitions: Array<contentTypeDefinition<contentTypeDefinitionField>>;
        ContentTypeDefinitionId: number;
        Templates: Array<template>;
        Inherit: boolean;
        IsNew: boolean;
        ParentArray: Array<folder<T>>;
        ChildrenTotalCount: number;
        ContentsTotalCount: number;
        MediaContentTotalCount: number;
        IsHidden: boolean;
        constructor(obj?: folder<T>);
        construct(data: any): void;
        clone(): folder<T>;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class folderController extends base.BaseController<folderController, entities.folder<entities.content> | entities.primitiveType<any> | entities.paginationEntity<entities.folder<entities.content>>> {
        constructor();
        getByFolderPath(path: string, loadContents: boolean, onSuccess: (obj: entities.folder<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        search(searchTerm: string, parentId: number, recursive: boolean, onSuccess: (obj: Array<entities.folder<entities.content>>) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetByFolderPath(paginationData: options.iFolderPaginatedRequestOptions, onSuccess: (obj: entities.folder<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetByParentId(paginationData: options.iFolderPaginatedRequestOptions, onSuccess: (obj: entities.paginationEntity<entities.folder<entities.content>>) => void, onError: (error: helpers.mdException) => void): void;
        getByParentId(parentId: number, onSuccess: (obj: Array<entities.folder<entities.content>>) => void, onError: (error: helpers.mdException) => void): void;
        getHierarchyByParentId(parentId: number, depth: any, onSuccess: (obj: Array<entities.folder<entities.content>>) => void, onError: (error: helpers.mdException) => void): void;
        getByParentIdCount(countData: any, onSuccess: (obj: number) => void, onError: (error: helpers.mdException) => void): void;
        getById(id: number, onSuccess: (obj: entities.folder<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        save(folder: number, onSuccess: (obj: entities.folder<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.folder<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class folderMediaContentMetaDataField extends base.BaseEntity implements base.IBaseEntity<folderMediaContentMetaDataField> {
        FolderId: number;
        MetaDataFieldId: number;
        IsRequired: boolean;
        Checked: boolean;
        Name: string;
        constructor(obj?: folderMediaContentMetaDataField);
        construct(data: any): void;
        clone(): folderMediaContentMetaDataField;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class folderMediaContentMetaDataFieldController extends base.BaseController<folderMediaContentMetaDataFieldController, entities.folderMediaContentMetaDataField> {
        constructor();
        getByIds(folderId: number, metaDataFieldId: number, onSuccess: (obj: entities.folderMediaContentMetaDataField) => void, onError: (error: helpers.mdException) => void): void;
        getUsed(folderId: number, onSuccess: (obj: Array<entities.folderMediaContentMetaDataField>) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.folderMediaContentMetaDataField>) => void, onError: (error: helpers.mdException) => void): void;
        getByFolderId(folderId: number, onSuccess: (obj: Array<entities.folderMediaContentMetaDataField>) => void, onError: (error: helpers.mdException) => void): void;
        getMediaContentMetaDataFieldByFolder(folderId: number, onSuccess: (obj: Array<entities.folderMediaContentMetaDataField>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class folderMetaDataFieldController extends base.BaseController<folderMetaDataFieldController, entities.folderMetaDataField> {
        constructor();
        getByIds(folderId: number, metaDataFieldId: number, onSuccess: (obj: entities.folderMetaDataField) => void, onError: (error: helpers.mdException) => void): void;
        getUsed(folderId: number, onSuccess: (obj: Array<entities.folderMetaDataField>) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.folderMetaDataField>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers.options {
    interface iUploadOptions {
        file: any;
        path: string;
        fileType: string;
        name?: string;
        description?: string;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class mediaContentController extends base.BaseController<mediaContentController, entities.mediaContent | entities.primitiveType<any> | entities.paginationEntity<entities.mediaContent>> {
        constructor();
        getById(id: number, lcid: number, onSuccess: (obj: entities.mediaContent) => void, onError: (error: helpers.mdException) => void): void;
        getByIdWithMetaData(id: number, lcid: number, onSuccess: (obj: entities.mediaContent) => void, onError: (error: helpers.mdException) => void): void;
        getByFolderId(id: number, lcid: number, onSuccess: (obj: entities.mediaContent) => void, onError: (error: helpers.mdException) => void): void;
        getByFileType(id: number, lcid: number, onSuccess: (obj: Array<entities.mediaContent>) => void, onError: (error: helpers.mdException) => void): void;
        search(searchData: any, onSuccess: (obj: Array<entities.mediaContent>) => void, onError: (error: helpers.mdException) => void): void;
        searchByFileType(searchText: string, fileType: number, lcid: number, onSuccess: (obj: Array<entities.mediaContent>) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.mediaContent) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.mediaContent>) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetByFolderId(paginationData: options.iFolderPaginatedRequestOptions, onSuccess: (obj: entities.paginationEntity<entities.mediaContent>) => void, onError: (error: helpers.mdException) => void): void;
        getByFolderIdCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        SavePermissions(mediaContent: entities.mediaContent, onSuccess: (obj: entities.mediaContent) => void, onError: (error: helpers.mdException) => void): void;
        save(mediaContent: entities.mediaContent, onSuccess: (obj: entities.mediaContent) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class mediaContentMetaDataFeldValuesController extends base.BaseController<mediaContentMetaDataFeldValuesController, entities.mediaContentMetaDataFeldValues> {
        constructor();
        getByMediaContentId(id: number, onSuccess: (obj: entities.mediaContentMetaDataFeldValues) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class menuContent extends base.BaseEntity implements base.IBaseEntity<menuContent> {
        LCID: number;
        DateCreated: Date;
        MenuId: number;
        Title: string;
        MenuContentPath: string;
        constructor(obj?: menuContent);
        construct(data: any): void;
        clone(): menuContent;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class menuContentController extends base.BaseController<menuContentController, entities.menuContent | entities.primitiveType<number> | entities.paginationEntity<entities.menuContent>> {
        constructor();
        getById(id: number, lcid: number, onSuccess: (obj: entities.menuContent) => void, onError: (error: helpers.mdException) => void): void;
        del(data: any, onSuccess: (obj: entities.menuContent) => void, onError: (error: helpers.mdException) => void): void;
        save(menuContent: entities.menuContent, onSuccess: (obj: entities.menuContent) => void, onError: (error: helpers.mdException) => void): void;
        update(menu: entities.menu, orderStart: boolean, onSuccess: (obj: entities.menuContent) => void, onError: (error: helpers.mdException) => void): void;
        deletemenu(menuContent: entities.menuContent, onSuccess: (obj: entities.menuContent) => void, onError: (error: helpers.mdException) => void): void;
        getByMenuIdCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetByMenuId(paginationData: any, onSuccess: (obj: entities.paginationEntity<entities.menuContent>) => void, onError: (error: helpers.mdException) => void): void;
        search(searchData: any, onSuccess: (obj: entities.menuContent) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class menu extends base.BaseEntity implements base.IBaseEntity<menu> {
        ParentId: number;
        Name: string;
        Description: string;
        Parent: menu;
        Children: Array<menu>;
        Items: Array<menuContent>;
        FreeTextField: string;
        Lcid: number;
        FolderId: number;
        MenuPath: string;
        Contents: Array<content>;
        Options: string;
        ParentArray: Array<menu>;
        ChildrenTotalCount: number;
        ContentsTotalCount: number;
        constructor(obj?: menu);
        construct(data: any): void;
        clone(): menu;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class menuController extends base.BaseController<menuController, entities.menu | entities.primitiveType<any> | entities.paginationEntity<entities.menu>> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.menu) => void, onError: (error: helpers.mdException) => void): void;
        getByParentId(id: number, depth: string, onSuccess: (obj: Array<entities.menu>) => void, onError: (error: helpers.mdException) => void): void;
        getByParentIdCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetMenuByPath(paginationData: any, onSuccess: (obj: entities.menu) => void, onError: (error: helpers.mdException) => void): void;
        GetByParentIdWithPagination(paginationData: any, onSuccess: (obj: entities.paginationEntity<entities.menu>) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.menu>) => void, onError: (error: helpers.mdException) => void): void;
        getHierarchyByParentId(id: number, depth: string, onSuccess: (obj: Array<entities.menu>) => void, onError: (error: helpers.mdException) => void): void;
        save(menu: entities.menu, onSuccess: (obj: entities.menu) => void, onError: (error: helpers.mdException) => void): void;
        updateChildren(menu: entities.menu, orderStart: number, onSuccess: (obj: entities.menu) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.menu) => void, onError: (error: helpers.mdException) => void): void;
        delContent(id: number, path: string, onSuccess: (obj: entities.menu) => void, onError: (error: helpers.mdException) => void): void;
        assignContentToMenu(menuId: number, contentId: string, onSuccess: (obj: entities.menu) => void, onError: (error: helpers.mdException) => void): void;
        getByMenuPath(path: string, onSuccess: (obj: entities.menu) => void, onError: (error: helpers.mdException) => void): void;
        search(searchData: any, onSuccess: (obj: Array<entities.menu>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class message extends base.BaseEntity implements base.IBaseEntity<message> {
        Subject: string;
        MessageContent: string;
        ParentId: number;
        IsRead: boolean;
        MessageFolderId: number;
        DateAdded: Date;
        Type: number;
        FromUserId: number;
        ToUserId: number;
        FromUser: user;
        ToUser: user;
        MainThread: number;
        constructor(obj?: message);
        construct(data: any): void;
        clone(): message;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class messageController extends base.BaseController<messageController, entities.message | entities.paginationEntity<entities.message>> {
        constructor();
        getByIdAndUserId(id: number, onSuccess: (obj: entities.message) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.message>) => void, onError: (error: helpers.mdException) => void): void;
        getByMessageFolder(messageFolderId: number, onSuccess: (obj: Array<entities.message>) => void, onError: (error: helpers.mdException) => void): void;
        getByMessageFolderAndUser(data: any, onSuccess: (obj: entities.paginationEntity<entities.message>) => void, onError: (error: helpers.mdException) => void): void;
        getByParent(parentId: number, onSuccess: (obj: Array<entities.message>) => void, onError: (error: helpers.mdException) => void): void;
        getByUserId(onSuccess: (obj: Array<entities.message>) => void, onError: (error: helpers.mdException) => void): void;
        getByMainThread(mainThread: number, onSuccess: (obj: Array<entities.message>) => void, onError: (error: helpers.mdException) => void): void;
        save(message: entities.message, onSuccess: (obj: entities.message) => void, onError: (error: helpers.mdException) => void): void;
        messageRead(message: entities.message, onSuccess: (obj: entities.message) => void, onError: (error: helpers.mdException) => void): void;
        replace(message: entities.message, onSuccess: (obj: entities.message) => void, onError: (error: helpers.mdException) => void): void;
        'delete'(id: number, onSuccess: (obj: entities.message) => void, onError: (error: helpers.mdException) => void): void;
        deleteMultiple(messages: any, onSuccess: (obj: Array<entities.message>) => void, onError: (error: helpers.mdException) => void): void;
        replaceMultiple(messages: any, onSuccess: (obj: Array<entities.message>) => void, onError: (error: helpers.mdException) => void): void;
        search(searchData: any, onSuccess: (obj: Array<entities.message>) => void, onError: (error: helpers.mdException) => void): void;
        getUnreadByUser(requestId: string, onSuccess: (obj: Array<entities.message>, socket: WebSocket) => void, onError: (error: helpers.mdException, socket: WebSocket) => void): string;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class messageFolder extends base.BaseEntity implements base.IBaseEntity<messageFolder> {
        Name: string;
        Icon: string;
        Author: user;
        IsGlobal: boolean;
        Messages: Array<message>;
        MessagesCount: number;
        constructor(obj?: messageFolder);
        construct(data: any): void;
        clone(): messageFolder;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class messageFolderController extends base.BaseController<messageFolderController, entities.messageFolder> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.messageFolder) => void, onError: (error: helpers.mdException) => void): void;
        getByIdAndAuthorId(id: number, onSuccess: (obj: entities.messageFolder) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.messageFolder>) => void, onError: (error: helpers.mdException) => void): void;
        getAllSystemFolders(onSuccess: (obj: Array<entities.messageFolder>) => void, onError: (error: helpers.mdException) => void): void;
        getByAuthorId(onSuccess: (obj: Array<entities.messageFolder>) => void, onError: (error: helpers.mdException) => void): void;
        save(messageFolder: entities.messageFolder, onSuccess: (obj: Array<entities.messageFolder>) => void, onError: (error: helpers.mdException) => void): void;
        'delete'(id: number, onSuccess: (obj: Array<entities.messageFolder>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class metaDataFieldController extends base.BaseController<metaDataFieldController, entities.metaDataField | entities.primitiveType<any> | entities.paginationEntity<entities.metaDataField>> {
        constructor();
        getAll(onSuccess: (obj: Array<entities.metaDataField>) => void, onError: (error: helpers.mdException) => void): void;
        getById(id: number, onSuccess: (obj: entities.metaDataField) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetAll(paginationData: any, onSuccess: (obj: entities.paginationEntity<entities.metaDataField>) => void, onError: (error: helpers.mdException) => void): void;
        getAllCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        getByFolderId(folderId: number, onSuccess: (obj: Array<entities.metaDataField>) => void, onError: (error: helpers.mdException) => void): void;
        metadatagetByFolder(folderId: number, onSuccess: (obj: Array<entities.metaDataField>) => void, onError: (error: helpers.mdException) => void): void;
        getByFolder(folderId: number, onSuccess: (obj: Array<entities.metaDataField>) => void, onError: (error: helpers.mdException) => void): void;
        save(metaDataField: entities.metaDataField, onSuccess: (obj: entities.metaDataField) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.metaDataField) => void, onError: (error: helpers.mdException) => void): void;
        assignMetaDataFieldToFolder(folderId: number, metaDataFieldId: number, onSuccess: (obj: entities.metaDataField) => void, onError: (error: helpers.mdException) => void): void;
        search(searchData: any, onSuccess: (obj: entities.metaDataField) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class metaDataFieldValueController extends base.BaseController<metaDataFieldValueController, entities.metaDataFieldValue> {
        constructor();
        getByContentId(id: number, onSuccess: (obj: Array<entities.metaDataFieldValue>) => void, onError: (error: helpers.mdException) => void): void;
        getByContent(content: entities.content, onSuccess: (obj: Array<entities.metaDataFieldValue>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.permissions {
    enum permissionAccessTypeEnum {
        Read = 1,
        Write = 2,
        Delete = 3
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.permissions {
    class entityPermission {
        Object: entitiesEnum;
        Entity: entitiesEnum;
        AccessTypes: Array<permissionAccessTypeEnum>;
        constructor();
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.permissions {
    class objectPermission {
        AccessTypes: Array<permissionAccessTypeEnum>;
        Object: entitiesEnum;
        ObjectId: string;
        constructor();
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.permissions {
    class permissionsBase extends base.BaseEntity {
        EntityPermissions: Array<entityPermission>;
        ObjectPermissions: Array<objectPermission>;
        constructor(obj?: permissionsBase);
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.permissions {
    class profileTypePermissions extends permissionsBase implements base.IBaseEntity<profileTypePermissions> {
        ProfileId: number;
        constructor(obj?: profileTypePermissions);
        construct(data: profileTypePermissions): void;
        clone(): profileTypePermissions;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class permissionControllerProfileType extends base.BaseController<permissionControllerProfileType, entities.permissions.profileTypePermissions> {
        constructor();
        getProfileTypePermissionsByObject(object: entities.entitiesEnum, objectId: number, onSuccess: (obj: Array<entities.permissions.profileTypePermissions>) => void, onError: (error: helpers.mdException) => void): void;
        getProfileTypePermissionsByEntity(entity: entities.entitiesEnum, entityId: number, onSuccess: (obj: Array<entities.permissions.profileTypePermissions>) => void, onError: (error: helpers.mdException) => void): void;
        getProfileTypePermissionsByEntities(entity: entities.entitiesEnum, entityIds: Array<number>, onSuccess: (obj: Array<entities.permissions.profileTypePermissions>) => void, onError: (error: helpers.mdException) => void): void;
        savePermissions(permissions: Array<entities.permissions.profileTypePermissions>, onSuccess: (obj: Array<entities.permissions.profileTypePermissions>) => void, onError: (error: helpers.mdException) => void): void;
        getLoggedOnProfileTypePermissionsSocket(requestId: string, onSuccess: (obj: Array<entities.permissions.profileTypePermissions>, socket: WebSocket) => void, onError: (error: helpers.mdException, socket: WebSocket) => void): string;
        getLoggedOnProfileTypePermissions(onSuccess: (obj: Array<entities.permissions.profileTypePermissions>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.permissions {
    class userPermissions extends permissionsBase implements base.IBaseEntity<userPermissions> {
        UserId: number;
        constructor(obj?: userPermissions);
        construct(data: userPermissions): void;
        clone(): userPermissions;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class permissionControllerUser extends base.BaseController<permissionControllerUser, entities.permissions.userPermissions> {
        constructor();
        getUserPermissionsByObject(object: entities.entitiesEnum, objectId: number, onSuccess: (obj: Array<entities.permissions.userPermissions>) => void, onError: (error: helpers.mdException) => void): void;
        getUserPermissionsByEntity(entity: entities.entitiesEnum, entityId: number, onSuccess: (obj: Array<entities.permissions.userPermissions>) => void, onError: (error: helpers.mdException) => void): void;
        getUserPermissionsByEntities(entity: entities.entitiesEnum, entityIds: Array<number>, onSuccess: (obj: Array<entities.permissions.userPermissions>) => void, onError: (error: helpers.mdException) => void): void;
        savePermissions(permissions: Array<entities.permissions.userPermissions>, onSuccess: (obj: Array<entities.permissions.userPermissions>) => void, onError: (error: helpers.mdException) => void): void;
        getLoggedOnUserPermissionsSocket(requestId: string, onSuccess: (obj: Array<entities.permissions.userPermissions>, socket: WebSocket) => void, onError: (error: helpers.mdException, socket: WebSocket) => void): string;
        getLoggedOnUserPermissions(onSuccess: (obj: Array<entities.permissions.userPermissions>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class profileController extends base.BaseController<profileController, entities.profileType> {
        constructor();
        assignProfileTypeToUser(assignData: any, onSuccess: (obj: entities.profileType) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class profileTypeController extends base.BaseController<profileTypeController, entities.profileType | entities.primitiveType<number>> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.profileType) => void, onError: (error: helpers.mdException) => void): void;
        getByIdAndTransformExpression(id: number, transform: boolean, onSuccess: (obj: entities.profileType) => void, onError: (error: helpers.mdException) => void): void;
        getAll(sort: string, onSuccess: (obj: Array<entities.profileType>) => void, onError: (error: helpers.mdException) => void): void;
        getByUser(userId: number, onSuccess: (obj: Array<entities.profileType>) => void, onError: (error: helpers.mdException) => void): void;
        getAllWithPagination(paginationData: any, onSuccess: (obj: Array<entities.profileType>) => void, onError: (error: helpers.mdException) => void): void;
        getAllCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        getNotBelonging(userId: number, onSuccess: (obj: Array<entities.profileType>) => void, onError: (error: helpers.mdException) => void): void;
        save(profileType: entities.profileType, onSuccess: (obj: entities.profileType) => void, onError: (error: helpers.mdException) => void): void;
        update(profileType: entities.profileType, onSuccess: (obj: entities.profileType) => void, onError: (error: helpers.mdException) => void): void;
        saveProfileTypeWithProfileTypeFieldValues(profileType: entities.profileType, onSuccess: (obj: entities.profileType) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.profileType) => void, onError: (error: helpers.mdException) => void): void;
        getAllProfileTypesWithPermissions(profileTypeData: any, onSuccess: (obj: Array<entities.profileType>) => void, onError: (error: helpers.mdException) => void): void;
        saveProfileTypePermissions(profileTypesData: Array<entities.profileType>, onSuccess: (obj: Array<entities.profileType>) => void, onError: (error: helpers.mdException) => void): void;
        search(searchData: any, onSuccess: (obj: Array<entities.profileType>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class profileTypeFieldController extends base.BaseController<profileTypeFieldController, entities.profileTypeField> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.profileTypeField) => void, onError: (error: helpers.mdException) => void): void;
        getByProfileType(id: number, onSuccess: (obj: Array<entities.profileTypeField>) => void, onError: (error: helpers.mdException) => void): void;
        save(profileTypeField: entities.profileTypeField, onSuccess: (obj: entities.profileTypeField) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.profileTypeField) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class profileTypeFieldValueController extends base.BaseController<profileTypeFieldValueController, entities.profileTypeFieldValue> {
        constructor();
        getByUser(id: number, onSuccess: (obj: Array<entities.profileTypeFieldValue>) => void, onError: (error: helpers.mdException) => void): void;
        save(profileTypeFieldValue: entities.profileTypeFieldValue, onSuccess: (obj: entities.profileTypeFieldValue) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class reportData extends base.BaseEntity implements base.IBaseEntity<reportData> {
        ReportId: number;
        DateCreated: Date;
        Data: any;
        constructor(obj?: reportData);
        construct(data: any): void;
        clone(): reportData;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class reportDataController extends base.BaseController<reportDataController, entities.reportData> {
        constructor();
        getAll(onSuccess: (obj: Array<entities.reportData>) => void, onError: (error: helpers.mdException) => void): void;
        getByReportSchedulerId(id: number, onSuccess: (obj: Array<entities.reportData>) => void, onError: (error: helpers.mdException) => void): void;
        save(reportData: entities.reportData, onSuccess: (obj: entities.reportData) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinitionGridCoordinates extends base.BaseEntity implements base.IBaseEntity<innerReportDefinitionGridCoordinates> {
        x: number;
        y: number;
        constructor(obj?: innerReportDefinitionGridCoordinates);
        construct(data: any): void;
        clone(): innerReportDefinitionGridCoordinates;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinitionProperty extends base.BaseEntity implements base.IBaseEntity<innerReportDefinitionProperty> {
        Type: number;
        Name: string;
        Enabled: boolean;
        constructor(obj?: innerReportDefinitionProperty);
        construct(data: any): void;
        clone(): innerReportDefinitionProperty;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinitionEntity extends base.BaseEntity implements base.IBaseEntity<innerReportDefinitionEntity> {
        Type: number;
        Name: string;
        Coordinates: innerReportDefinitionGridCoordinates;
        UniqueId: string;
        Fields: Array<innerReportDefinitionProperty>;
        BaseFields: Array<innerReportDefinitionProperty>;
        ExtendedFields: Array<innerReportDefinitionProperty>;
        constructor(obj?: innerReportDefinitionEntity);
        construct(data: any): void;
        clone(): innerReportDefinitionEntity;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinitionJoinInner extends base.BaseEntity implements base.IBaseEntity<innerReportDefinitionJoinInner> {
        Entity: innerReportDefinitionEntity;
        Property: innerReportDefinitionProperty;
        constructor(obj?: innerReportDefinitionJoinInner);
        construct(data: any): void;
        clone(): innerReportDefinitionJoinInner;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinitionJoin extends base.BaseEntity implements base.IBaseEntity<innerReportDefinitionJoin> {
        Left: innerReportDefinitionJoinInner;
        Right: innerReportDefinitionJoinInner;
        Type: number;
        constructor(obj?: innerReportDefinitionJoin);
        construct(data: any): void;
        clone(): innerReportDefinitionJoin;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinitionUniqueProperty extends base.BaseEntity implements base.IBaseEntity<innerReportDefinitionUniqueProperty> {
        UniqueId: string;
        Property: innerReportDefinitionProperty;
        constructor(obj?: innerReportDefinitionUniqueProperty);
        construct(data: any): void;
        clone(): innerReportDefinitionUniqueProperty;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinitionColumn extends innerReportDefinitionUniqueProperty implements base.IBaseEntity<innerReportDefinitionColumn> {
        Type: number;
        Value: string;
        constructor(obj?: innerReportDefinitionColumn);
        construct(data: any): void;
        clone(): innerReportDefinitionColumn;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinitionFilter extends innerReportDefinitionUniqueProperty implements base.IBaseEntity<innerReportDefinitionFilter> {
        Type: number;
        Value: string;
        Entity: innerReportDefinitionEntity;
        Property: innerReportDefinitionProperty;
        IsDynamic: boolean;
        constructor(obj?: innerReportDefinitionFilter);
        construct(data: any): void;
        clone(): innerReportDefinitionFilter;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinitionGroup extends innerReportDefinitionUniqueProperty implements base.IBaseEntity<innerReportDefinitionGroup> {
        constructor(obj?: innerReportDefinitionGroup);
        construct(data: any): void;
        clone(): innerReportDefinitionGroup;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinitionLimit extends base.BaseEntity implements base.IBaseEntity<innerReportDefinitionLimit> {
        From: number;
        To: number;
        constructor(obj?: innerReportDefinitionLimit);
        construct(data: any): void;
        clone(): innerReportDefinitionLimit;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class innerReportDefinition extends base.BaseEntity implements base.IBaseEntity<innerReportDefinition> {
        Entities: Array<innerReportDefinitionEntity>;
        Joins: Array<innerReportDefinitionJoin>;
        Columns: Array<innerReportDefinitionColumn>;
        Filters: Array<innerReportDefinitionFilter>;
        Groupings: Array<innerReportDefinitionGroup>;
        Limit: innerReportDefinitionLimit;
        constructor(obj?: innerReportDefinition);
        construct(data: any): void;
        clone(): innerReportDefinition;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class reportDefinition extends base.BaseEntity implements base.IBaseEntity<reportDefinition> {
        Name: string;
        Definition: innerReportDefinition;
        Sql: string;
        AuthorId: number;
        Author: user;
        Json: string;
        DateCreated: Date;
        DateModified: Date;
        constructor(obj?: reportDefinition);
        construct(data: any): void;
        clone(): reportDefinition;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class reportDefinitionController extends base.BaseController<reportDefinitionController, entities.reportDefinition | entities.primitiveType<any> | entities.innerReportDefinitionEntity | entities.paginationEntity<entities.reportDefinition>> {
        constructor();
        getEntities(onSuccess: (obj: Array<entities.innerReportDefinitionEntity>) => void, onError: (error: helpers.mdException) => void): void;
        getReportPreview(data: any, onSuccess: (obj: entities.primitiveType<object>) => void, onError: (error: helpers.mdException) => void): void;
        save(reportDefinition: entities.reportDefinition, onSuccess: (obj: entities.reportDefinition) => void, onError: (error: helpers.mdException) => void): void;
        getReportColumns(reportDefinition: entities.reportDefinition, onSuccess: (obj: entities.reportDefinition) => void, onError: (error: helpers.mdException) => void): void;
        getAll(sortData: any, onSuccess: (obj: Array<entities.reportDefinition>) => void, onError: (error: helpers.mdException) => void): void;
        getById(id: number, onSuccess: (obj: entities.reportDefinition) => void, onError: (error: helpers.mdException) => void): void;
        search(searchData: any, onSuccess: (obj: Array<entities.reportDefinition>) => void, onError: (error: helpers.mdException) => void): void;
        getAllWithPagination(paginationData: any, onSuccess: (obj: entities.paginationEntity<entities.reportDefinition>) => void, onError: (error: helpers.mdException) => void): void;
        getAllCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.reportDefinition) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class reportDirectory extends base.BaseEntity implements base.IBaseEntity<reportDirectory> {
        Path: string;
        Children: Array<reportDirectory>;
        constructor(obj?: reportDirectory);
        construct(data: any): void;
        clone(): reportDirectory;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class reportDirectoryController extends base.BaseController<reportDirectoryController, entities.reportDirectory> {
        constructor();
        getReportDirectoryByPath(path: string, onSuccess: (obj: entities.reportDirectory) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class reportSchedulerAction extends base.BaseEntity implements base.IBaseEntity<reportSchedulerAction> {
        SchedulerId: number;
        Name: string;
        AuthorId: number;
        DateCreated: Date;
        DateEdited: Date;
        ActionType: number;
        Options: string;
        IsActive: boolean;
        constructor(obj?: reportSchedulerAction);
        construct(data: any): void;
        clone(): reportSchedulerAction;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class reportScheduler extends base.BaseEntity implements base.IBaseEntity<reportScheduler> {
        Name: string;
        AuthorId: number;
        DateCreated: Date;
        IsRecurring: boolean;
        Interval: number;
        Start: Date;
        End: Date;
        ReportId: number;
        IsActive: boolean;
        Actions: Array<reportSchedulerAction>;
        Author: user;
        constructor(obj?: reportScheduler);
        construct(data: any): void;
        clone(): reportScheduler;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class reportSchedulerController extends base.BaseController<reportSchedulerController, entities.reportScheduler | entities.primitiveType<any> | entities.paginationEntity<entities.reportScheduler>> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.reportScheduler) => void, onError: (error: helpers.mdException) => void): void;
        getByReportDefinitionId(id: number, onSuccess: (obj: Array<entities.reportScheduler>) => void, onError: (error: helpers.mdException) => void): void;
        getAll(searchTerm: string, onSuccess: (obj: Array<entities.reportScheduler>) => void, onError: (error: helpers.mdException) => void): void;
        save(reportScheduler: entities.reportScheduler, onSuccess: (obj: entities.reportScheduler) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.reportScheduler) => void, onError: (error: helpers.mdException) => void): void;
        getReportSchedulerActionTypes(onSuccess: (obj: Array<entities.primitiveType<String>>) => void, onError: (error: helpers.mdException) => void): void;
        getAllWithPagination(paginationData: any, onSuccess: (obj: entities.paginationEntity<entities.reportScheduler>) => void, onError: (error: helpers.mdException) => void): void;
        getAllCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class searchController extends base.BaseController<searchController, entities.search.searchResults> {
        constructor();
        fullTextSearch(searchTerm: string, onSuccess: (obj: entities.search.searchResults) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class hardwareInfoDrive extends base.BaseEntity implements base.IBaseEntity<hardwareInfoDrive> {
        Label: string;
        TotalSizeMb: number;
        AvaliableSizeMb: number;
        UsedSizeMb: number;
        TotalSizeGb: number;
        AvaliableSizeGb: number;
        UsedSizeGb: number;
        Format: string;
        constructor(obj?: hardwareInfoDrive);
        construct(data: any): void;
        clone(): hardwareInfoDrive;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class hardwareInfoNetworkInterface extends base.BaseEntity implements base.IBaseEntity<hardwareInfoNetworkInterface> {
        Name: string;
        Description: string;
        SentMb: number;
        ReceivedMb: number;
        SentGb: number;
        ReceivedGb: number;
        NetworkUtilization: number;
        constructor(obj?: hardwareInfoNetworkInterface);
        construct(data: any): void;
        clone(): hardwareInfoNetworkInterface;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class hardwareInfoProcess extends base.BaseEntity implements base.IBaseEntity<hardwareInfoProcess> {
        Name: string;
        User: string;
        ProcessorUsage: number;
        MemoryUsageMb: number;
        constructor(obj?: hardwareInfoProcess);
        construct(data: any): void;
        clone(): hardwareInfoProcess;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class hardwareInfoPerformance extends base.BaseEntity implements base.IBaseEntity<hardwareInfoPerformance> {
        SampleDateTime: Date;
        CpuUsage: number;
        FreeMemoryMb: number;
        TotalMemoryMb: number;
        UsedMemoryMb: number;
        Drives: Array<hardwareInfoDrive>;
        NetworkInterfaces: Array<hardwareInfoNetworkInterface>;
        Processes: Array<hardwareInfoProcess>;
        constructor(obj?: hardwareInfoPerformance);
        construct(data: any): void;
        clone(): hardwareInfoPerformance;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class pluginJob extends base.BaseEntity implements base.IBaseEntity<pluginJob> {
        PluginName: string;
        Message: string;
        StartedOn: Date;
        constructor(obj?: pluginJob);
        construct(data: any): void;
        clone(): pluginJob;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class systemInfoController extends base.BaseController<systemInfoController, entities.hardwareInfoPerformance | entities.pluginJob> {
        constructor();
        getPerformance(requestId: string, delay: number, onSuccess: (obj: entities.hardwareInfoPerformance, socket: WebSocket) => void, onError: (error: helpers.mdException, socket: WebSocket) => void): void;
        getPluginJobs(requestId: string, onSuccess: (obj: Array<entities.pluginJob>, socket: WebSocket) => void, onError: (error: helpers.mdException, socket: WebSocket) => void): string;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class taxonomyContentController extends base.BaseController<taxonomyContentController, entities.taxonomyContent | entities.primitiveType<any> | entities.paginationEntity<entities.taxonomyContent>> {
        constructor();
        getByTaxonomyId(id: number, onSuccess: (obj: Array<entities.taxonomyContent>) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetByTaxonomyId(paginationData: any, onSuccess: (obj: entities.paginationEntity<entities.taxonomyContent>) => void, onError: (error: helpers.mdException) => void): void;
        getByTaxonomyIdCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        del(deleteData: any, onSuccess: (obj: entities.taxonomyContent) => void, onError: (error: helpers.mdException) => void): void;
        save(taxonomyContent: entities.taxonomyContent, onSuccess: (obj: entities.taxonomyContent) => void, onError: (error: helpers.mdException) => void): void;
        deletetaxonomy(content: entities.content, onSuccess: (obj: entities.taxonomyContent) => void, onError: (error: helpers.mdException) => void): void;
        savecontent(taxonomy: entities.taxonomy, onSuccess: (obj: entities.taxonomyContent) => void, onError: (error: helpers.mdException) => void): void;
        update(taxonomy: entities.taxonomy, pageIndex: number, onSuccess: (obj: entities.taxonomyContent) => void, onError: (error: helpers.mdException) => void): void;
        deletecontent(taxonomy: entities.taxonomy, onSuccess: (obj: entities.taxonomyContent) => void, onError: (error: helpers.mdException) => void): void;
        search(searchTerm: string, taxonomyId: number, lcid: number, onSuccess: (obj: Array<entities.taxonomyContent>) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class taxonomyController extends base.BaseController<taxonomyController, entities.taxonomy | entities.primitiveType<any> | entities.paginationEntity<entities.taxonomy>> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.taxonomy) => void, onError: (error: helpers.mdException) => void): void;
        getByParentId(id: number, depth: string, onSuccess: (obj: Array<entities.taxonomy>) => void, onError: (error: helpers.mdException) => void): void;
        getByParentIdCount(countData: any, depth: string, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetTaxonomyByPath(paginationData: any, onSuccess: (obj: entities.taxonomy) => void, onError: (error: helpers.mdException) => void): void;
        GetByParentIdWithPagination(paginationData: any, onSuccess: (obj: entities.paginationEntity<entities.taxonomy>) => void, onError: (error: helpers.mdException) => void): void;
        updateChildren(taxonomy: entities.taxonomy, orderStart: number, onSuccess: (obj: entities.taxonomy) => void, onError: (error: helpers.mdException) => void): void;
        search(searchTerm: string, taxonomyId: number, recursive: boolean, onSuccess: (obj: Array<entities.taxonomy>) => void, onError: (error: helpers.mdException) => void): void;
        getByContent(id: number, onSuccess: (obj: Array<entities.taxonomy>) => void, onError: (error: helpers.mdException) => void): void;
        taxonomyContentGetTaxonomyByContent(content: entities.content, onSuccess: (obj: Array<entities.taxonomy>) => void, onError: (error: helpers.mdException) => void): void;
        getAll(lcid: number, onSuccess: (obj: Array<entities.taxonomy>) => void, onError: (error: helpers.mdException) => void): void;
        getHierarchyByParentId(id: number, depth: string, onSuccess: (obj: Array<entities.taxonomy>) => void, onError: (error: helpers.mdException) => void): void;
        getHierarchyByParentIdWithContents(id: number, depth: string, loadContents: boolean, onSuccess: (obj: Array<entities.taxonomy>) => void, onError: (error: helpers.mdException) => void): void;
        save(taxonomy: entities.taxonomy, onSuccess: (obj: entities.taxonomy) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.taxonomy) => void, onError: (error: helpers.mdException) => void): void;
        assignContentToTaxonomy(id: number, contentId: string, onSuccess: (obj: entities.taxonomy) => void, onError: (error: helpers.mdException) => void): void;
        assignContentToTaxonomies(taxonomyIds: Array<number>, contentId: string, onSuccess: (obj: entities.taxonomy) => void, onError: (error: helpers.mdException) => void): void;
        getByTaxonomyPath(path: string, onSuccess: (obj: entities.taxonomy) => void, onError: (error: helpers.mdException) => void): void;
        delContent(id: number, path: string, onSuccess: (obj: entities.taxonomy) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class templateController extends base.BaseController<templateController, entities.template | entities.templateScreenshot | entities.primitiveType<any> | entities.paginationEntity<entities.template>> {
        constructor();
        getByFolder(folderId: number, onSuccess: (obj: Array<entities.template>) => void, onError: (error: helpers.mdException) => void): void;
        getAll(sort: string, onSuccess: (obj: Array<entities.template>) => void, onError: (error: helpers.mdException) => void): void;
        getAllWithPagination(paginationData: any, onSuccess: (obj: entities.paginationEntity<entities.template>) => void, onError: (error: helpers.mdException) => void): void;
        getAllCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        getById(id: number, onSuccess: (obj: entities.template) => void, onError: (error: helpers.mdException) => void): void;
        save(template: entities.template, onSuccess: (obj: entities.template) => void, onError: (error: helpers.mdException) => void): void;
        del(id: number, onSuccess: (obj: entities.template) => void, onError: (error: helpers.mdException) => void): void;
        search(searchData: string, onSuccess: (obj: Array<entities.template>) => void, onError: (error: helpers.mdException) => void): void;
        getScreenshot(templateScreenshot: entities.templateScreenshot, onSuccess: (obj: entities.templateScreenshot) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class templateFile extends base.BaseEntity implements base.IBaseEntity<templateFile> {
        Path: string;
        Name: string;
        constructor(obj?: templateFile);
        construct(data: any): void;
        clone(): templateFile;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class templateDirectory extends base.BaseEntity implements base.IBaseEntity<templateDirectory> {
        Path: string;
        Children: Array<templateDirectory>;
        Files: Array<templateFile>;
        Name: string;
        RootPath: string;
        constructor(obj?: templateDirectory);
        construct(data: any): void;
        clone(): templateDirectory;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class templateDirectoryController extends base.BaseController<templateDirectoryController, entities.templateDirectory> {
        constructor();
        getTemplateDirectoryByPath(template: entities.template, onSuccess: (obj: entities.templateDirectory) => void, onError: (error: helpers.mdException) => void): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers {
    class userController extends base.BaseController<userController, entities.user | entities.primitiveType<any> | entities.paginationEntity<entities.user>> {
        constructor();
        getById(id: number, onSuccess: (obj: entities.user) => void, onError: (error: helpers.mdException) => void): void;
        getAllUserWithPermissions(usersData: any, onSuccess: (obj: Array<entities.user>) => void, onError: (error: helpers.mdException) => void): void;
        getOnlyNotAuthorizedUsers(usersData: any, onSuccess: (obj: Array<entities.user>) => void, onError: (error: helpers.mdException) => void): void;
        getAll(onSuccess: (obj: Array<entities.user>) => void, onError: (error: helpers.mdException) => void): void;
        paginationGetAll(paginationData: any, onSuccess: (obj: entities.paginationEntity<entities.user>) => void, onError: (error: helpers.mdException) => void): void;
        getAllCount(countData: any, onSuccess: (obj: entities.primitiveType<number>) => void, onError: (error: helpers.mdException) => void): void;
        updateUserPermission(users: Array<entities.user>, onSuccess: (obj: entities.user) => void, onError: (error: helpers.mdException) => void): void;
        save(user: entities.user, onSuccess: (obj: entities.user) => void, onError: (error: helpers.mdException) => void): void;
        assignProfileTypeToUser(profileTypeId: number, userId: number, onSuccess: (obj: entities.user) => void, onError: (error: helpers.mdException) => void): void;
        del(userId: number, onSuccess: (obj: entities.user) => void, onError: (error: helpers.mdException) => void): void;
        login(username: string, password: string, onSuccess: (obj: entities.loggedOnUser) => void, onError: (error: helpers.mdException) => void): string;
        logout(userLoggingOut: entities.loggedOnUser, onSuccess: () => void, onError: (error: helpers.mdException) => void): void;
        getByToken(token: string, onSuccess: (obj: entities.user) => void, onError: (error: helpers.mdException) => void): void;
        resetAccount(username: string, onSuccess: (obj: entities.user) => void, onError: (error: helpers.mdException) => void): void;
        saveUserPermissions(permissionsData: any, onSuccess: (obj: Array<entities.primitiveType<string>>) => void, onError: (error: helpers.mdException) => void): void;
        updateUser(user: entities.user, onSuccess: (obj: Array<entities.user>) => void, onError: (error: helpers.mdException) => void): void;
        search(searchData: any, onSuccess: (obj: Array<entities.user>) => void, onError: (error: helpers.mdException) => void): void;
        passwordReset(token: string, email: string, password: string, onSuccess: (obj: entities.user) => void, onError: (error: helpers.mdException) => string): void;
        validateTokenSocket(requestId: string, token: string, onSuccess: (obj: entities.user, socket: WebSocket) => void, onError: (error: helpers.mdException, socket: WebSocket) => void): string;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers.options {
    interface iFolderPaginatedRequestOptions extends iPathPaginatedRequestOptions {
        fillContents: boolean;
        fillMediaContents: boolean;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers.options {
    interface iPaginatedRequestOptions {
        pageIndex: number;
        pageSize: number;
        fillContents: boolean;
        fillMediaContents: boolean;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers.options {
    interface iPathPaginatedRequestOptions extends iSearchRequestOptions {
        path: string;
    }
}
declare namespace mdBusinessLogic.dataAccess.controllers.options {
    interface iSearchRequestOptions extends iPaginatedRequestOptions {
        searchTerm: string;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class actionSchedule<T> extends base.BaseEntity implements base.IBaseEntity<actionSchedule<T>> {
        ActionType: T;
        ExecutionType: executionScheduleType;
        ExecutionSecondsFrequency: number;
        ExecutionStart: Date;
        ExecutionEnd: Date;
        Enabled: boolean;
        constructor(obj?: actionSchedule<T>);
        construct(data: any): void;
        clone(): actionSchedule<T>;
    }
    enum executionScheduleType {
        Manual = 0,
        Recurring = 1
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class aliasModel<T extends content & base.IBaseEntity<T>> implements base.IBaseEntity<aliasModel<T>> {
        Id: string;
        Template: string;
        Content: T;
        AliasType: aliasType;
        private Instance;
        constructor(obj?: aliasModel<T>);
        construct(data: any): void;
        clone(): aliasModel<T>;
    }
    enum aliasType {
        Content = 1,
        Taxonomy = 2,
        Folder = 3
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    enum attributeTypeEnum {
        input = 1,
        trueFalse = 2,
        textarea = 3,
        selectSingle = 4,
        selectMultiple = 5,
        taxonomySelectorSingle = 6,
        taxonomySelectorMultiple = 7,
        file = 8,
        date = 9,
        map = 10,
        contentSelectorSingle = 11,
        youtube = 12,
        section = 13,
        mediaContentSelectorSingle = 14,
        userSelectorSingle = 15,
        calculated = 16,
        tabbedSections = 17
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class contentTypeDataSourceJoin extends base.BaseEntity implements base.IBaseEntity<contentTypeDataSourceJoin> {
        RightDataSourceId: number;
        LeftRightDataSourceJoinType: string;
        LeftFieldId: number;
        RightFieldId: number;
        constructor(obj?: contentTypeDataSourceJoin);
        construct(data: any): void;
        clone(): contentTypeDataSourceJoin;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class contentTypeDataSource extends base.BaseEntity implements base.IBaseEntity<contentTypeDataSource> {
        ConnectionString: string;
        ConnectionStringObject: any;
        DbType: string;
        ContentTypeDefinitionId: number;
        constructor(obj?: contentTypeDataSource);
        construct(data: any): void;
        clone(): contentTypeDataSource;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class contentTypeDefinitionFolderDataBoundCondition implements base.IBaseEntity<contentTypeDefinitionFolderDataBoundCondition> {
        ContentTypeDefinitionFieldId: number;
        Value: string;
        ContentTypeDefinitionId: number;
        FolderId: number;
        Comparer: ComparerType;
        constructor(obj?: contentTypeDefinitionFolderDataBoundCondition);
        construct(data: any): void;
        clone(): contentTypeDefinitionFolderDataBoundCondition;
    }
    enum ComparerType {
        Equals = 1,
        NotEquals = 2,
        Like = 3,
        GreaterThan = 4,
        GreaterThanOrEqualTo = 5,
        LessThan = 6,
        LessThanOrEqualTo = 7
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class contentTypeDefinitionFolderDataBoundSync implements base.IBaseEntity<contentTypeDefinitionFolderDataBoundSync> {
        FolderId: number;
        ContentTypeDefinitionId: number;
        StartTime: Date;
        EndTime: Date;
        Frequency: number;
        SyncType: contentTypeDefinitionFolderDataBoundSyncType;
        DeltaFieldId: number;
        constructor(obj?: contentTypeDefinitionFolderDataBoundSync);
        construct(data: any): void;
        clone(): contentTypeDefinitionFolderDataBoundSync;
    }
    enum contentTypeDefinitionFolderDataBoundSyncType {
        NoSync = 0,
        RemoteToOmega = 1,
        OmegaToRemote = 2,
        Bidirectional = 3
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class culture extends base.BaseEntity implements base.IBaseEntity<culture> {
        LCID: number;
        Name: string;
        Code: string;
        IsoCode: string;
        IsApproved: boolean;
        constructor(obj?: culture);
        construct(data: any): void;
        clone(): culture;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class paginationEntity<T extends base.IBaseEntity<T> & base.BaseEntity> implements base.IBaseEntity<paginationEntity<T>> {
        private type;
        Items: Array<T>;
        TotalCount: number;
        constructor(type: new () => T, obj?: paginationEntity<T>);
        construct(data: any): void;
        clone(): paginationEntity<T>;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class primitiveType<T> extends base.BaseEntity implements base.IBaseEntity<primitiveType<T>> {
        Value: any;
        constructor(obj?: primitiveType<T>);
        construct(value: T): void;
        clone(): primitiveType<T>;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities {
    class secureMessage extends base.BaseEntity implements base.IBaseEntity<secureMessage> {
        EndPoint: string;
        Message: string;
        IsEncripted: boolean;
        constructor(obj?: secureMessage);
        construct(data: any): void;
        clone(): secureMessage;
    }
}
declare namespace mdBusinessLogic {
    namespace dataAccess {
        namespace entities {
            class templateScreenshot extends base.BaseEntity implements base.IBaseEntity<templateScreenshot> {
                ScreenshotUrl: string;
                ScreenshotFile: string;
                ScreenshotWidth: number;
                ScreenshotHeight: number;
                Template: template;
                constructor(obj?: templateScreenshot);
                construct(data: any): void;
                clone(): templateScreenshot;
            }
        }
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.generic {
    class extendedDateTime implements base.IBaseEntity<extendedDateTime> {
        value: any;
        timezone: any;
        constructor(data?: any);
        toDate(): Date;
        toString(): string;
        construct(data: any): void;
        clone(): extendedDateTime;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.generic {
    interface iGenericKeyValuePair<T> {
        Key: string;
        Value: T;
    }
    class genericKeyValuePair<T> implements base.IBaseEntity<genericKeyValuePair<T>>, iGenericKeyValuePair<T> {
        Key: string;
        Value: T;
        constructor(obj?: iGenericKeyValuePair<T>);
        construct(data: any): void;
        clone(): genericKeyValuePair<T>;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.generic {
    interface iGenericCollection<T> {
        Collection?: Array<genericKeyValuePair<T>>;
    }
    class genericCollection<T> implements base.IBaseEntity<genericCollection<T>> {
        private Collection;
        constructor(obj?: iGenericCollection<T>);
        getCollection(): Array<genericKeyValuePair<T>>;
        remove(key: string): void;
        add(key: string, value: T): void;
        get(key: string): T;
        getKeyValuePair(key: string): generic.genericKeyValuePair<T>;
        construct(data: any): void;
        clone(): genericCollection<T>;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.generic {
    class keyValuePair extends genericKeyValuePair<string> implements base.IBaseEntity<keyValuePair> {
        constructor(obj?: iGenericKeyValuePair<string>);
        clone(): keyValuePair;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.grid {
    class gridTileData implements base.IBaseEntity<gridTileData> {
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        id: string;
        parentId: string;
        uniqueId: string;
        index: number;
        layout: gridTileLayout;
        whiteframe: number;
        layoutPadding: boolean;
        layoutMargin: boolean;
        layoutWrap: boolean;
        constructor(obj?: gridTileData);
        construct(data: any): void;
        clone(): gridTileData;
        getWidth(): number;
        getHeight(): number;
        setWidth(width: number): void;
        setHeight(height: number): void;
    }
    enum gridTileLayout {
        Row = 1,
        Column = 2
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.genericContent {
    class genericContentFieldJsonField implements base.IBaseEntity<genericContentFieldJsonField> {
        validation: fieldValidation;
        helpText: string;
        access: string;
        cssClass: string;
        toggle: string;
        hidden: boolean;
        enabled: boolean;
        gridTileData: mdBusinessLogic.dataAccess.entities.grid.gridTileData;
        style: any;
        metadata: Array<generic.keyValuePair>;
        constraints: generic.genericCollection<iGenericContentFieldJsonFieldConstraint>;
        linkToTitle: boolean;
        constructor(obj?: genericContentFieldJsonField);
        construct(data: any): void;
        clone(): genericContentFieldJsonField;
        getStyle(attributeType: entities.attributeTypeEnum): any;
        getConstraint(key: string): iGenericContentFieldJsonFieldConstraint;
        getDefaultConstraint(): iGenericContentFieldJsonFieldConstraint;
        setDefaultConstraint(value: iGenericContentFieldJsonFieldConstraint): void;
        getRelevantConstraint(): iGenericContentFieldJsonFieldConstraint;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.genericContent {
    interface iGenericContentFieldJsonFieldConstraint {
        folderPaths?: string[];
        contentIds?: string[];
        userIds?: string[];
        profileId?: string;
        contentTypeId?: string;
        taxonomyIds?: string[];
        menuPaths?: string[];
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.permissions {
    enum permissionObjectEnum {
        None = 0,
        Folder = 1,
        Content = 2,
        MediaContent = 3
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.permissions {
    enum permissionObjectTypeEnum {
        User = 0,
        ProfileType = 1
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.permissions {
    enum permissionTypeEnum {
        Api = 1,
        Object = 2
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.search {
    abstract class baseSearch {
        Id: number;
        Name: string;
        TableName: string;
        constructor(obj?: baseSearch);
        construct(data: any): void;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.search {
    class content extends baseSearch implements base.IBaseEntity<content> {
        Path: string;
        DateCreated: Date;
        FolderId: number;
        constructor(obj?: content);
        construct(data: any): void;
        clone(): content;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.search {
    class contentType extends baseSearch implements base.IBaseEntity<contentType> {
        constructor(obj?: contentType);
        construct(data: any): void;
        clone(): contentType;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.search {
    class folder extends baseSearch implements base.IBaseEntity<folder> {
        Path: string;
        constructor(obj?: folder);
        construct(data: any): void;
        clone(): folder;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.search {
    class mediaContent extends baseSearch implements base.IBaseEntity<mediaContent> {
        Path: string;
        DateCreated: Date;
        FolderId: number;
        FileType: mdBusinessLogic.dataAccess.entities.mediaContentInputType;
        FileName: string;
        constructor(obj?: mediaContent);
        construct(data: any): void;
        clone(): mediaContent;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.search {
    class menu extends baseSearch implements base.IBaseEntity<menu> {
        Path: string;
        constructor(obj?: menu);
        construct(data: any): void;
        clone(): menu;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.search {
    class profileType extends baseSearch implements base.IBaseEntity<profileType> {
        constructor(obj?: profileType);
        construct(data: any): void;
        clone(): profileType;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.search {
    class searchResults implements base.IBaseEntity<searchResults> {
        Folders: Array<folder>;
        Taxonomies: Array<taxonomy>;
        Menus: Array<menu>;
        Contents: Array<content>;
        ContentTypes: Array<contentType>;
        ProfileTypes: Array<profileType>;
        MediaContents: Array<mediaContent>;
        constructor(obj?: searchResults);
        construct(data: any): void;
        clone(): searchResults;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.search {
    class taxonomy extends baseSearch implements base.IBaseEntity<taxonomy> {
        Path: string;
        constructor(obj?: taxonomy);
        construct(data: any): void;
        clone(): taxonomy;
    }
}
declare namespace mdBusinessLogic.dataAccess.entities.search {
    class user extends baseSearch implements base.IBaseEntity<user> {
        constructor(obj?: user);
        construct(data: any): void;
        clone(): user;
    }
}
declare namespace mdBusinessLogic.dataAccess.query {
    class queryExpressionGeneric<T, K extends queryExpressionGeneric<T, K>> {
        private field;
        private contentType;
        private comparer;
        private transform;
        private value;
        constructor(transform: helpers.data.dataTransformEnum);
        protected compareGeneric(obj: K, comparer: helpers.data.comparerTypeEnum): K;
        protected withValueGeneric(obj: K, value: T): K;
        execute(onSuccess: (data: Array<entities.contentTypeDefinitionFieldValue>) => void, onError: (error: helpers.mdException) => void): void;
        executeAsContents(onSuccess: (data: Array<entities.content>) => void, onError: (error: helpers.mdException) => void): void;
        protected static queryGeneric<T, K extends queryExpressionGeneric<T, K>>(obj1: entities.contentTypeDefinition<entities.contentTypeDefinitionField>, obj: K, fieldName: string): K;
    }
    class queryExpressionString extends queryExpressionGeneric<string, queryExpressionString> {
        constructor();
        compare(comparer: helpers.data.comparerTypeEnum): queryExpressionString;
        withValue(value: string): queryExpressionString;
        static query(obj1: entities.contentTypeDefinition<entities.contentTypeDefinitionField>, fieldName: string): queryExpressionString;
    }
    class queryExpressionInteger extends queryExpressionGeneric<number, queryExpressionInteger> {
        constructor();
        compare(comparer: helpers.data.comparerTypeEnum): queryExpressionInteger;
        withValue(value: number): queryExpressionInteger;
        static query(obj1: entities.contentTypeDefinition<entities.contentTypeDefinitionField>, fieldName: string): queryExpressionInteger;
    }
    class queryExpressionDate extends queryExpressionGeneric<Date, queryExpressionDate> {
        constructor();
        compare(comparer: helpers.data.comparerTypeEnum): queryExpressionDate;
        withValue(value: Date): queryExpressionDate;
        static query(obj1: entities.contentTypeDefinition<entities.contentTypeDefinitionField>, fieldName: string): queryExpressionDate;
    }
}
declare namespace mdBusinessLogic.helpers {
    module array {
    }
}
declare namespace mdBusinessLogic.helpers {
    module checkType {
        function isFunction(functionToCheck: any): boolean;
        function isArray(obj: any): boolean;
        function isObject(obj: any): boolean;
        function getTypeName(obj: any): string;
    }
}
declare namespace mdBusinessLogic.helpers {
    class crypto {
        static md5(input: string): string;
        static aes(input: string): string;
        static sha256(input: string): string;
        static sha3(input: string): string;
    }
}
declare namespace mdBusinessLogic {
    namespace helpers {
        class dialog {
            dialog: any;
            state: any;
            constructor(dialog: any, state: any);
            showSimpleDialogO(_dialogInfo: any, _stateInfo: any): void;
            showCustomDialog(_onConfirm: any, _onDecline: any): void;
            showSimpleDialog(_title: any, _text: any, _redirect: any, _state: any, _stateParams: any): void;
            showConfirmDialogO(_dialogInfo: any, _onConfirm: any, _onDecline: any): void;
            showConfirmDialog(_title: any, _text: any, _ok: any, _cancel: any, _onConfirm: any, _onDecline: any): void;
            redirect(_state: any, _stateParams: any): void;
        }
    }
}
declare namespace mdBusinessLogic.helpers {
    class Guid {
        static validator: RegExp;
        static EMPTY: string;
        static isGuid(guid: any): boolean;
        static create(): Guid;
        static createEmpty(): Guid;
        static parse(guid: string): Guid;
        static raw(): string;
        private static gen;
        private value;
        private constructor();
        equals(other: Guid): boolean;
        isEmpty(): boolean;
        toString(): string;
        toJSON(): any;
    }
}
declare namespace mdBusinessLogic.helpers {
    module touchScreenHelper {
        function isTouchDevice(): number | true;
    }
}
declare namespace mdBusinessLogic.helpers {
    module typeConversion {
        function toInt(value: number | string, defaultValue?: number, stripNonNumbers?: boolean): number;
        function toFloat(value: number | string, defaultValue?: number, stripNonNumbers?: boolean): number;
    }
}
declare namespace mdBusinessLogic.helpers.data {
    enum comparerTypeEnum {
        equals = 1,
        notEquals = 2,
        like = 3,
        greaterThan = 4,
        greaterThanOrEqualTo = 5,
        lessThan = 6,
        lessThanOrEqualTo = 7
    }
}
declare namespace mdBusinessLogic.helpers.data {
    enum dataTransformEnum {
        toString = 1,
        toInt = 2,
        toLong = 3,
        toDateTime = 4,
        toFloat = 5
    }
}
declare namespace mdBusinessLogic.settings {
    module ajax {
        function onComplete(xhr: any): void;
        function onBeforeSend(xhr: XMLHttpRequest): void;
        function onUnauthorized(error: mdBusinessLogic.helpers.mdException): void;
        function onForbidden(error: mdBusinessLogic.helpers.mdException): void;
        function onJsonSerialize(nonSerializedRequest: any): any;
        interface connectionObject<T> {
            id: string;
            obj: T;
            successEvents?: {
                (data: any): void;
            }[];
            errorEvents?: {
                (data: any): void;
            }[];
        }
        class connections {
            private static _sockets;
            private static _requests;
            static addSocket(socket: connectionObject<WebSocket>): void;
            static addRequest(request: connectionObject<XMLHttpRequest>): void;
            static getSocket(id: string): WebSocket;
            static getRequest(id: string): XMLHttpRequest;
            static getRequestObject(id: string): connectionObject<XMLHttpRequest>;
            static removeSocket(id: string): void;
            static removeRequest(id: string): void;
            static closeSockets(): void;
            static closeRequests(): void;
            static closeAll(): void;
        }
    }
}
declare namespace mdBusinessLogic.settings.secureApi {
    var enabled: boolean;
    var rsaKeys: Object;
    var aesKey: string;
    var aesIV: string;
    var crypto: any;
    var token: string;
}
