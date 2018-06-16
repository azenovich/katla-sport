using System;
using System.Runtime.Serialization;

namespace KatlaSport.Services
{
    [Serializable]
    public class RequestedResourceBadRequestException : Exception
    {
        public RequestedResourceBadRequestException()
        {
        }

        public RequestedResourceBadRequestException(string message)
            : base(message)
        {
        }

        public RequestedResourceBadRequestException(string message, Exception inner)
            : base(message, inner)
        {
        }

        protected RequestedResourceBadRequestException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
